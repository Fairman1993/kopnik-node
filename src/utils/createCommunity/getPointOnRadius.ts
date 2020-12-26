export default function (center, distance, angle) {
  return {
    lat: center.lat + distance * Math.cos(angle) / 2,
    lng: center.lng + distance * Math.sin(angle)
  }
}
