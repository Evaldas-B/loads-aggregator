import { env } from '@/env/server'

import geocodingService from '@mapbox/mapbox-sdk/services/geocoding-v6'
import directionsService from '@mapbox/mapbox-sdk/services/directions'

export const geocodingV6 = geocodingService({ accessToken: env.mapbox.key })
export const directions = directionsService({ accessToken: env.mapbox.key })
