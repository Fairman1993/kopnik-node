import {User} from "@entity/user/User.entity";
import createCommunity from "./createCommunity";
import container from "@/di/container";

(async function () {
  await container.provideDatabase()
  const east = await createCommunity({
    location: {
      lat: 61,
      lng: 100,
    },
    size: 15,
    complexity: 3 ,
    grandForeman: new User(2),
  })

  const west = await createCommunity({
    location: {
      lat: 51,
      lng: 24,
    },
    size: 10,
    complexity: 5,
    grandForeman: new User(2),
  })
  // return; 8h-

  const middle = await createCommunity({
    location: {
      "lat": 55.085,
      "lng": 38.784,
    },
    size: 10,
    complexity: 5    ,
    grandForeman: new User(2),
  })

  const moscow = await createCommunity({
    location: {
      lat: 55.749,
      lng: 37.613,
    },
    size: 0.2,
    complexity: 4,
    grandForeman: middle,
  })

  const na = await createCommunity({
    location: {
      "lat":42.467,
      "lng":-96.425
    },
    size: 20,
    complexity: 3 ,
    grandForeman: west,
  })

  const sa = await createCommunity({
    location: {
      "lat":-13.424,
      "lng":-57.978
    },
    size: 10,
    complexity: 3,
    grandForeman: na,
  })


  const china = await createCommunity({
    location: {
      "lat":34.232,
      "lng":103.763
    },
    size: 10,
    complexity: 3,
    grandForeman: east,
  })

  const af = await createCommunity({
    location: {
      "lat":7.274,
      "lng":24.773
    },
    size: 20,
    complexity: 3,
    grandForeman: west,
  })

  const australia = await createCommunity({
    location: {
      "lat":-25.051,
      "lng":135.168
    },
    size: 15,
    complexity: 3,
    grandForeman: east,
  })
})()
