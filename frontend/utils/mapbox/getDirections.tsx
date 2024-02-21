import { directions } from './index'
import { type Waypoint } from '@mapbox/mapbox-sdk/services/directions'

export async function getDirections(waypoints: Waypoint[]) {
  const res = await directions
    .getDirections({
      profile: 'driving',
      steps: false,
      alternatives: false,
      overview: 'simplified',
      geometries: 'geojson',
      waypoints,
    })
    .send()

  const [route] = res.body.routes
  return route.geometry.coordinates as [number, number][]
}
