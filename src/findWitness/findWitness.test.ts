import container from "@/di/container"
import {getManager, getRepository} from "typeorm"
import {User} from "@entity/user/User.entity"
import testUser from "@entity/user/test-utils/testUser";
import createTestUser from "@entity/user/test-utils/createTestUser";
import findWitness from "@/findWitness/findWitness";
import testUserFactory from "@entity/user/test-utils/testUserFactory";

describe('User', () => {
  beforeEach(async () => {
    await container.provideDatabase()
  })

  it('find with smallest radius', async () => {
    // создал с большим радиусом близко
    const regionWitness = await createTestUser('regionWitness', {
      isWitness: true,
      witnessRadius: 100,
      location: {
        lat: 77.00001,
        lng: 77.00001,
      },
    })

    // создал с малым радиусом подальше
    const cityWitness = await createTestUser('cityWitness', {
      isWitness: true,
      witnessRadius: 10,
      location: {
        lat: 77.001,
        lng: 77.001,
      },
    })

    const witness = await findWitness(testUserFactory('halfUser', {
      id: -1,
      location: {
        lat: 77,
        lng: 77,
      },
    }))

    expect(witness.latitude).toBe(cityWitness.latitude)
    expect(witness.longitude).toBe(cityWitness.longitude)
  })
  it('fallback user=1', async () => {
    const witness = await findWitness(testUserFactory('halfUser', {
      id: -1,
      location: {
        lat: -77,
        lng: -77,
      },
    }))

    expect(witness.id).toBe(1)
  })
})
