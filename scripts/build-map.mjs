// Generates app/assets/map-dots.json: a dotted Africa/Europe/Middle-East map.
import { readFileSync, writeFileSync } from 'node:fs'
import { feature } from 'topojson-client'
import { geoMercator, geoContains } from 'd3-geo'

const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8'))
const land = feature(topo, topo.objects.land)

const W = 1000
const LON0 = -16, LON1 = 55, LAT0 = -9, LAT1 = 61
const proj = geoMercator().scale(W / ((LON1 - LON0) * Math.PI / 180)).translate([0, 0])
const [ox, oy] = proj([LON0, LAT1])
const H = Math.round(proj([LON0, LAT0])[1] - oy)

const step = 13
const dots = []
for (let y = step / 2; y < H; y += step) {
  const row = Math.round(y / step) % 2 // brick offset
  for (let x = step / 2 + (row ? step / 2 : 0); x < W; x += step) {
    const ll = proj.invert([x + ox, y + oy])
    if (geoContains(land, ll)) dots.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10])
  }
}
const at = (lat, lon) => { const [x, y] = proj([lon, lat]); return [Math.round((x - ox) * 10) / 10, Math.round((y - oy) * 10) / 10] }
const cities = {
  Nairobi: { xy: at(-1.286, 36.82), lat: -1.286, lon: 36.82 },
  Rome: { xy: at(41.9, 12.5), lat: 41.9, lon: 12.5 },
  Amsterdam: { xy: at(52.37, 4.9), lat: 52.37, lon: 4.9 },
  London: { xy: at(51.5, -0.12), lat: 51.5, lon: -0.12 },
  Athens: { xy: at(37.98, 23.73), lat: 37.98, lon: 23.73 },
  Madrid: { xy: at(40.4, -3.7), lat: 40.4, lon: -3.7 }
}
writeFileSync('app/assets/map-dots.json', JSON.stringify({ w: W, h: H, step, dots, cities }))
console.log('dots', dots.length, 'size', W, H, 'Nairobi', cities.Nairobi.xy, 'Rome', cities.Rome.xy)
