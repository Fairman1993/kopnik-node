import container from "@/di/container"
import {getManager, getRepository, Repository} from "typeorm"
import {User} from "@entity/user/User.entity"
import createUser from "@entity/user/test-utils/createTestUser";

describe.skip('eager', () => {
  let repository: Repository<User>,
    foreman: User,
    subordinate: User

  beforeAll(async () => {
    await container.provideDatabase()
    repository = getRepository(User)
  })

  it('foreman on create', async () => {
    // create relations
    const foreman = await createUser('foreman', {})
    const foremanRequest = await createUser('foremanRequest', {})
    const witness = await createUser('witness', {})

    //eager user
    let eager = await createUser('eager', {
      foreman: foreman,
      foremanRequest: foremanRequest,
      witness: witness,
    })

    // checks
    eager = await repository.findOne(eager.id, {
      // relations: ['subordinates']
    })
    expect(eager.foreman.id).toBe(foreman.id)
    expect(eager.foremanRequest.id).toBe(foremanRequest.id)
    expect(eager.witness.id).toBe(witness.id)
  })
})
