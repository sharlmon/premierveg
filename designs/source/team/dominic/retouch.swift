import Foundation
import CoreImage
import Vision
import AppKit
let args = CommandLine.arguments
let inPath = args[1], outPath = args[2]
let T1 = Double(args.count > 3 ? args[3] : "6")!   // warm-tint threshold
let T2 = Double(args.count > 4 ? args[4] : "30")!  // darkness threshold
let ctx = CIContext()
guard var img = CIImage(contentsOf: URL(fileURLWithPath: inPath), options: [.applyOrientationProperty: true]) else { fatalError("load") }
img = img.transformed(by: CGAffineTransform(translationX: -img.extent.origin.x, y: -img.extent.origin.y))
let ext = img.extent
var work = img.cropped(to: CGRect(x: ext.width*0.105, y: ext.height*0.165, width: ext.width*0.89, height: ext.height*0.79))
work = work.transformed(by: CGAffineTransform(translationX: -work.extent.origin.x, y: -work.extent.origin.y))
let scale = 900.0 / work.extent.width
work = work.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
let w = Int(work.extent.width), h = Int(work.extent.height)
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
let cg = ctx.createCGImage(work, from: work.extent)!
let req = VNGeneratePersonSegmentationRequest(); req.qualityLevel = .accurate; req.outputPixelFormat = kCVPixelFormatType_OneComponent8
try VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
var mask = CIImage(cvPixelBuffer: req.results!.first!.pixelBuffer)
mask = mask.transformed(by: CGAffineTransform(scaleX: work.extent.width/mask.extent.width, y: work.extent.height/mask.extent.height))
mask = mask.applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 1.6]).cropped(to: work.extent)

// ---- pixel pass: clean the white coat ----
var px = [UInt8](repeating: 0, count: w*h*4)
ctx.render(work, toBitmap: &px, rowBytes: w*4, bounds: work.extent, format: .RGBA8, colorSpace: cs)
var mk = [UInt8](repeating: 0, count: w*h)
ctx.render(mask, toBitmap: &mk, rowBytes: w, bounds: work.extent, format: .L8, colorSpace: nil)
// coat = person, below the collar, neutral/pale (not the blue shirt, not skin)
var coat = [Float](repeating: 0, count: w*h)
for y in Int(Double(h)*0.36)..<h { for x in 0..<w {
  let i = y*w+x; if mk[i] < 235 { continue }
  let r = Double(px[i*4]), g = Double(px[i*4+1]), b = Double(px[i*4+2])
  let lum = 0.3*r+0.59*g+0.11*b, sat = max(r,g,b)-min(r,g,b)
  if lum > 95 && sat < 60 { coat[i] = 1 }
}}
// protect the "PREMIER VG" lettering and keep clear of the shirt/neck
for y in 540..<604 { for x in 535..<660 { if y < h && x < w { coat[y*w+x] = 0 } } }
func boxBlur(_ a: [Float], r: Int) -> [Float] {
  var t = [Float](repeating: 0, count: w*h), o = [Float](repeating: 0, count: w*h)
  for y in 0..<h { var s: Float = 0; for x in 0..<min(r,w) { s += a[y*w+x] }
    for x in 0..<w { if x+r < w { s += a[y*w+x+r] }; if x-r-1 >= 0 { s -= a[y*w+x-r-1] }; t[y*w+x] = s } }
  for x in 0..<w { var s: Float = 0; for y in 0..<min(r,h) { s += t[y*w+x] }
    for y in 0..<h { if y+r < h { s += t[(y+r)*w+x] }; if y-r-1 >= 0 { s -= t[(y-r-1)*w+x] }; o[y*w+x] = s } }
  return o
}
var clean = [Float](repeating: 0, count: w*h)
for i in 0..<(w*h) where coat[i] > 0 { let r = Double(px[i*4]), b = Double(px[i*4+2]); let l = 0.3*r+0.59*Double(px[i*4+1])+0.11*b; if (r-b) <= 1 && l > 150 { clean[i] = 1 } }
var ch = (0..<3).map { c in (0..<(w*h)).map { Float(px[$0*4+c]) * clean[$0] } }
let wsum = boxBlur(clean, r: 16)
let ref = ch.map { boxBlur($0, r: 16) }
var out = px
var fixed = 0
for i in 0..<(w*h) where coat[i] > 0 && wsum[i] > 40 {
  let rr = Double(ref[0][i]/wsum[i]), rg = Double(ref[1][i]/wsum[i]), rb = Double(ref[2][i]/wsum[i])
  let r = Double(px[i*4]), g = Double(px[i*4+1]), b = Double(px[i*4+2])
  let lum = 0.3*r+0.59*g+0.11*b, rl = 0.3*rr+0.59*rg+0.11*rb
  let warm = (r-b) - (rr-rb) + 3          // browner than the clean coat around it
  let dark = rl - lum                    // darker than the surrounding coat
  var s = 0.0
  if warm > T1 { s = max(s, min(1, (warm-T1)/8)) }
  if dark > T2 { s = max(s, min(1, (dark-T2)/14)) }
  if s > 0 { fixed += 1
    out[i*4] = UInt8(r*(1-s)+rr*s); out[i*4+1] = UInt8(g*(1-s)+rg*s); out[i*4+2] = UInt8(b*(1-s)+rb*s) }
}
// whiten the coat a touch: neutralise the colour cast and lift it
for i in 0..<(w*h) where coat[i] > 0 {
  let r = Double(out[i*4]), g = Double(out[i*4+1]), b = Double(out[i*4+2])
  let l = 0.3*r+0.59*g+0.11*b
  let k = 0.3
  var nr = r*(1-k)+l*k, ng = g*(1-k)+l*k, nb = b*(1-k)+l*k
  let lift = max(0, (245-l))*0.10
  nr += lift; ng += lift; nb += lift*1.02
  out[i*4] = UInt8(min(255, nr)); out[i*4+1] = UInt8(min(255, ng)); out[i*4+2] = UInt8(min(255, nb))
}
print("spot pixels fixed:", fixed)
let data = Data(out)
let work2 = CIImage(bitmapData: data, bytesPerRow: w*4, size: CGSize(width: w, height: h), format: .RGBA8, colorSpace: cs)

// ---- background blur (as before) ----
let grown = mask.applyingFilter("CIMorphologyMaximum", parameters: [kCIInputRadiusKey: 9]).cropped(to: work.extent)
let inv = grown.applyingFilter("CIColorInvert")
let wallOnly = work.applyingFilter("CIMultiplyCompositing", parameters: [kCIInputBackgroundImageKey: inv]).cropped(to: work.extent)
let num = wallOnly.clampedToExtent().applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 24]).cropped(to: work.extent)
let den = inv.clampedToExtent().applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 24]).cropped(to: work.extent)
var bg = den.applyingFilter("CIDivideBlendMode", parameters: [kCIInputBackgroundImageKey: num]).cropped(to: work.extent)
bg = bg.applyingFilter("CIColorControls", parameters: [kCIInputBrightnessKey: 0.02, kCIInputSaturationKey: 0.9])
var fg = work2.applyingFilter("CIColorControls", parameters: [kCIInputBrightnessKey: 0.02, kCIInputContrastKey: 1.05, kCIInputSaturationKey: 1.04])
fg = fg.applyingFilter("CINoiseReduction", parameters: ["inputNoiseLevel": 0.01, "inputSharpness": 0.55])
fg = fg.applyingFilter("CIUnsharpMask", parameters: [kCIInputRadiusKey: 1.4, kCIInputIntensityKey: 0.5])
let result = fg.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: bg, kCIInputMaskImageKey: mask])
try ctx.writeJPEGRepresentation(of: result, to: URL(fileURLWithPath: outPath), colorSpace: cs, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.9])
