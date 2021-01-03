import waitForExpect from 'wait-for-expect'
import container from "@/di/container"
import {EntityManager, getManager, getRepository} from "typeorm"
import {User} from "@entity/user/User.entity"
import createTestUser from "@entity/user/test-utils/createTestUser";
import request from "supertest";
import app from "@/app";
import plain from "@entity/user/plain";
import {API, VK} from "vk-io";
import FriendStatusEnum from "@/di/vk-io/FriendStatusEnum";
import userFactory from "@entity/user/test-utils/testUserFactory";

describe('update', () => {
  let witness: User,
    main: User,
    em: EntityManager,
    vk: VK,
    areFriendsOriginal: VK['api']['friends']['areFriends']

  beforeAll(async () => {
    vk = container.vk
    areFriendsOriginal = vk.api.friends.areFriends

    await container.provideDatabase()
    em= getManager()
    witness= await createTestUser('witness',{
      isWitness:true,
    })
  })

  beforeEach(async () => {
    vk.api.friends.areFriends= areFriendsOriginal
    main = await createTestUser('main', {

    })
  })

  it('HeSendRequest', async () => {
    main = await createTestUser('main', )

    let iteration= 0
    vk.api.friends.areFriends = jest.fn(async function (params) {
      return [{user_id: params.user_ids[0], friend_status: iteration++?FriendStatusEnum.Friend: FriendStatusEnum.HeSendRequest}]
    } as API["friends"]['areFriends'])

    const res = await request(app)
      .post('/api/users/updateProfile')
      .set('T-Authorization', main.mid.toString())
      .send(plain(main))

    expect(res.status).toEqual(200)

    await waitForExpect(async ()=>{
      main= await em.findOneOrFail(User, main.id)
      expect(main.witnessChat.id).not.toBeNull()
    })
  })

  it('friends (99% of confirmed)', async () => {
    main = await createTestUser('main', {
      witness_id: witness.id,
    })
    const res = await request(app)
      .post('/api/users/updateProfile')
      .set('T-Authorization', main.mid.toString())
      .send(plain(main))

    expect(res.status).toEqual(200)
  })
})

