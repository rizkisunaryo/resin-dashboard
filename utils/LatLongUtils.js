import { LAT_TO_METER, LONG_TO_METER } from '../configs/LatLong'

export const calculateSpeed = (lat, long, prevLat, prevLong, timeInterval) => {
  const latDifPower = Math.pow((lat - prevLat) * LAT_TO_METER, 2)
  const longDifPower = Math.pow((long - prevLong) * LONG_TO_METER, 2)
  const journey = Math.pow(latDifPower + longDifPower, 0.5)
  return Math.floor(journey / timeInterval)
}
