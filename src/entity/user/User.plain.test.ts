import container from "@/di/container"
import {getManager, getRepository, Repository} from "typeorm"
import {User} from "@entity/user/User.entity"
import userFactory from "@entity/user/test-utils/testUserFactory";
import createUser from "@entity/user/test-utils/createTestUser";
import setUserForeman from "@entity/user/setUserForeman";
import transaction from "@/transaction/transaction";
import plain from "@entity/user/plain";

describe('plain', () => {
  let repository: Repository<User>

  beforeAll(async () => {
    await container.provideDatabase()
    repository = getRepository(User)
  })

  it('relation', async () => {
    const main= userFactory('main',)
    main.foreman= userFactory('foreman', {id:-100})
    main.witness=null

    const mainPlain= plain(main, {isCurrentUser: true})
    expect(mainPlain.foreman.id).toBe(main.foreman.id)
    expect(mainPlain.witness).toBeNull()
    expect(mainPlain.foremanRequest).toBeUndefined()
  })
  it('relations', async () => {
    const main= userFactory('main',)
    main.subordinates= [userFactory('foreman', {id:-100})]

    const mainPlain= plain(main)
    expect(mainPlain.subordinates[0].id).toBe(-100)
  })
})
