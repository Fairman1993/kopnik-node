import {User} from "@/entity/user/User.entity";
import dic from "@/utils/dic/person";
import mids from "@/utils/dic/mids"
import _ from "lodash";
import avatars from "@/utils/dic/avatars";
import createTestUser from "@entity/user/test-utils/createTestUser";
import getPointOnRadius from "@/utils/createCommunity/getPointOnRadius";
import randomize from "@/utils/createCommunity/randomize";

const K_DISTANCE = 0.33

export default async function createCommunity({location, size, complexity, grandForeman}) : Promise<User>{
  // create foreman
  const isWitness= complexity>2?true:_.random(Math.pow(10, 3-complexity))===1

  const foreman = await createTestUser(null, {
    firstName: dic.name[_.random(dic.name.length - 1)],
    lastName: dic.lastName[_.random(dic.lastName.length - 1)],
    patronymic: dic.middleNameMale[_.random(dic.middleNameMale.length - 1)],
    location,
    photo: avatars[_.random(avatars.length - 1)],
    foreman_id: grandForeman?.id,
    // mid: mids[_.random(mids.length - 1)]
    isWitness,
    witnessRadius: isWitness?size*200:null,
  })

  // create forks
  if (complexity > 0) {
    const forksCount = 3 + _.random(0, 6)
    let angle = 0,
      eachForkLocation: { lat, lng }

    for (let i = 0; i < forksCount; i++) {
      angle += 2 * Math.PI / forksCount
      eachForkLocation = getPointOnRadius(location, randomize(size), randomize(angle))
      if (eachForkLocation.lat > 70) {
        eachForkLocation = getPointOnRadius(location, randomize(size / 2), randomize(angle))
      }
      const eachForkSize = randomize(size * K_DISTANCE)

      await createCommunity({
        location: eachForkLocation,
        size: eachForkSize,
        complexity: complexity - 1,
        grandForeman: foreman
      })
    }
  }

  return foreman
}
