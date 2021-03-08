import fetch from 'cross-fetch'

import IIpApiResult from "@/di/ip-api/IIpApiResult";


// https://ip-api.com/docs/api:json
export default async function ipApi(ip: string): Promise<IIpApiResult> {
  // noinspection HttpUrlsUsage
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,query`),
    result= await response.json()
  return result
}
