import container from "@/di/container"
import {getManager, getRepository} from "typeorm"
import {User} from "@entity/user/User.entity"
import testUser from "@entity/user/test-utils/testUser";
import createTestUser from "@entity/user/test-utils/createTestUser";
import findWitness from "@/findWitness/findWitness";
import testUserFactory from "@entity/user/test-utils/testUserFactory";

describe('findWitness', () => {
  let globalWitness,
    localWitness

  beforeEach(async () => {
    await container.provideDatabase()

    // создал с большим радиусом близко
    globalWitness = await createTestUser('regionWitness', {
      isWitness: true,
      witnessRadius: 100,
      latitude: 77.00001,
      longitude: 77.00001,
    })

    // создал с малым радиусом подальше
    localWitness = await createTestUser('regionWitness', {
      isWitness: true,
      witnessRadius: 10,
      latitude: 77.001,
      longitude: 77.001,
    })
  })

  it('find local witness', async () => {
    const witness = await findWitness(testUserFactory('halfUser', {
      id: -1,
      latitude: 77,
      longitude: 77,
    }))

    expect(witness.latitude).toBe(localWitness.latitude)
    expect(witness.longitude).toBe(localWitness.longitude)
  })
  it('fallback user1 when no witness found', async () => {
    const witness = await findWitness(testUserFactory('halfUser', {
      id: -1,
      latitude: -77,
      longitude: -77,
    }))

    expect(witness.id).toBe(1)
  })
  it('self witness user1', async () => {
    const witness = await findWitness(testUserFactory('halfUser', {
      id: 1,
      latitude: localWitness.latitude,
      longitude: localWitness.longitude,
    }))

    expect(witness.id).toBe(1)
  })
})
