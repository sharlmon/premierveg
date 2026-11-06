// Generates app/assets/globe-dots.json: evenly spaced land dots on a sphere as [lat, lon], for the rotating globe.
import { readFileSync, writeFileSync } from 'node:fs'
import { feature } from 'topojson-client'
import { geoContains } from 'd3-geo'

const land = feature(JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8')), JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8')).objects.land)
const D = 2.1 // spacing in degrees
const dots = []
for (let lat = -84; lat <= 84; lat += D) {
  const n = Math.max(1, Math.round(360 * Math.cos((lat * Math.PI) / 180) / D))
  for (let i = 0; i < n; i++) {
    const lon = -180 + ((i + (Math.round((lat + 90) / D) % 2) / 2) * 360) / n
    if (geoContains(land, [lon, lat])) dots.push([Math.round(lat * 10) / 10, Math.round(lon * 10) / 10])
  }
}
writeFileSync('app/assets/globe-dots.json', JSON.stringify(dots))
console.log('land dots', dots.length)
