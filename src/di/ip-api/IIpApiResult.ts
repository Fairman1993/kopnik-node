export default interface IIpApiResult {
  status: 'success' | 'fail',
  country: string,
  countryCode: string,
  region: string,
  regionName: string,
  city: string,
  lat: number,
  lon: number,
}
