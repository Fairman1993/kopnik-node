import container from "@/di/container"
import {getManager, getRepository} from "typeorm"
import {User} from "@entity/user/User.entity"
import testUser from "@entity/user/test-utils/testUser";
import createTestUser from "@entity/user/test-utils/createTestUser";
import findWitness from "@/findWitness/findWitness";
import testUserFactory from "@entity/user/test-utils/testUserFactory";
import findNeighbors from "@/findWitness/findNeighbors";

describe('findNeighbors', () => {
  let farNeighbor,
    closeNeighbor

  beforeEach(async () => {
    await container.provideDatabase()

    // создал с большим радиусом близко
    closeNeighbor = await createTestUser('closeNeighbor', {
      isWitness: true,
      witnessRadius: 100,
      latitude: 88.00001,
      longitude: 88.00001,
    })

    // создал с малым радиусом подальше
    farNeighbor = await createTestUser('farNeighbor', {
      isWitness: true,
      witnessRadius: 10,
      latitude: 88.001,
      longitude: 88.001,
    })
  })

  it('closest', async () => {
    let halfUser = testUserFactory('halfUser', {
      id: -1,
      latitude: 88,
      longitude: 88,
    });
    const neighbors = await findNeighbors(halfUser,1)

    expect(neighbors).toHaveLength(1)
    expect(neighbors[0].id).not.toBe(halfUser.id)
    expect(neighbors[0].latitude).toBe(closeNeighbor.latitude)
    expect(neighbors[0].longitude).toBe(closeNeighbor.longitude)
  })
})
