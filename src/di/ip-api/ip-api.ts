import TYPES from "@/di/TYPES";
import container from "@/di/container";
import ipApi from "@/di/ip-api/ipApi";

container.bind<typeof ipApi>(TYPES.ipApi).toDynamicValue(context => {
  if (process.env.NODE_ENV == 'test') {
    return async function (ip:string) {
      return {
        "status": "success",
        "country": "Russia",
        "countryCode": "CA",
        "region": "QC",
        "regionName": "Quebec",
        "city": "Montreal",
        "lat": 0,
        "lon": 0
      }
    }
  }
  else{
    return ipApi
  }
}).inSingletonScope()
