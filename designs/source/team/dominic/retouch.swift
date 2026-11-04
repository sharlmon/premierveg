import Foundation
import CoreImage
import Vision
import AppKit
let args = CommandLine.arguments
let inPath = args[1], outPath = args[2]
let ctx = CIContext()
guard var img = CIImage(contentsOf: URL(fileURLWithPath: inPath), options: [.applyOrientationProperty: true]) else { fatalError("load") }
img = img.transformed(by: CGAffineTransform(translationX: -img.extent.origin.x, y: -img.extent.origin.y))
let ext = img.extent
// crop: face-centred head & torso (fractions of image)
let cropRect = CGRect(x: ext.width*0.105, y: ext.height*0.165, width: ext.width*0.89, height: ext.height*0.79) // y from bottom
var work = img.cropped(to: cropRect)
work = work.transformed(by: CGAffineTransform(translationX: -work.extent.origin.x, y: -work.extent.origin.y))
let W = 900.0
let scale = W / work.extent.width
work = work.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
let cg = ctx.createCGImage(work, from: work.extent)!
let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
let h = VNImageRequestHandler(cgImage: cg, options: [:])
try h.perform([req])
guard let res = req.results?.first else { fatalError("no mask") }
var mask = CIImage(cvPixelBuffer: res.pixelBuffer)
mask = mask.transformed(by: CGAffineTransform(scaleX: work.extent.width/mask.extent.width, y: work.extent.height/mask.extent.height))
// soften the mask edge a touch
mask = mask.applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 1.6]).cropped(to: work.extent)
// background: strong blur + slight darken/desaturate so he pops
let grown = mask.applyingFilter("CIMorphologyMaximum", parameters: [kCIInputRadiusKey: 9]).cropped(to: work.extent)
let inv = grown.applyingFilter("CIColorInvert")
let wallOnly = work.applyingFilter("CIMultiplyCompositing", parameters: [kCIInputBackgroundImageKey: inv]).cropped(to: work.extent)
let num = wallOnly.clampedToExtent().applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 24]).cropped(to: work.extent)
let den = inv.clampedToExtent().applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 24]).cropped(to: work.extent)
var bg = den.applyingFilter("CIDivideBlendMode", parameters: [kCIInputBackgroundImageKey: num]).cropped(to: work.extent)
bg = bg.applyingFilter("CIColorControls", parameters: [kCIInputBrightnessKey: 0.02, kCIInputSaturationKey: 0.9])
// subject: gentle clean-up
var fg = work.applyingFilter("CIColorControls", parameters: [kCIInputBrightnessKey: 0.03, kCIInputContrastKey: 1.06, kCIInputSaturationKey: 1.04])
fg = fg.applyingFilter("CINoiseReduction", parameters: ["inputNoiseLevel": 0.01, "inputSharpness": 0.55])
fg = fg.applyingFilter("CIUnsharpMask", parameters: [kCIInputRadiusKey: 1.4, kCIInputIntensityKey: 0.55])
let out = fg.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: bg, kCIInputMaskImageKey: mask])
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
try ctx.writeJPEGRepresentation(of: out, to: URL(fileURLWithPath: outPath), colorSpace: cs, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.9])
print("ok", work.extent)
