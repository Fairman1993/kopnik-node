import container from "@/di/container"
import {EntityManager, getManager} from "typeorm"
import {User} from "@entity/user/User.entity"
import createTestUser from "@entity/user/test-utils/createTestUser";
import request from "supertest";
import app from "@/app";
import plain from "@entity/user/plain";
import {VK} from "vk-io";
import FriendStatusEnum from "@/di/vk-io/FriendStatusEnum";
import FriendsFriendStatusEx from "@/vk/utils/FriendsFriendStatusEx";
import meetHalfUserReadyToWitnessChat from "@/job/meetHalfUserReadyToWitnessChat";
import StatusEnum from "@entity/user/StatusEnum"


describe('updateProfile', () => {
  let witness: User,
    halfUser: User,
    em: EntityManager,
    vk: VK

  beforeAll(async () => {
    vk = container.vk
    vk.api.friends.areFriends = jest.fn(vk.api.friends.areFriends)
    vk.api.messages.send = jest.fn(vk.api.messages.send);

    await container.provideDatabase()
    await container.provideI18next()
    em = getManager()

    // создаю на всякий случай, потому что для заверения нужне хотя бы один пользователь
    witness = await createTestUser('witness', {
      isWitness: true,
    })
  })

  beforeEach(async ()=>{
    jest.resetAllMocks()
  })

  /**
   * Тестовый пользователь имеет статус Новый, поэтому нет чата заверения и запускается асинхронный сценарий с первичным заверением
   */
  it('async', async () => {
    halfUser = await createTestUser('main',{
      status: StatusEnum.New,
    })

    const res = await request(app)
      .post('/api/users/updateProfile')
      .set('T-Authorization', halfUser.mid.toString())
      .send({...plain(halfUser), changeset:[], changesetTranslated:[]});

    expect(res.status).toEqual(200);

    // попытка 1 когда заявка в друзья не принята
    (vk.api.friends.areFriends as jest.Mock).mockReturnValueOnce([{
      friend_status: FriendStatusEnum.HeSendRequest,
      user_id: halfUser.mid,
    }] as FriendsFriendStatusEx[])
    const halfUsers1 = await meetHalfUserReadyToWitnessChat();
    expect(halfUsers1).toHaveLength(0);

    // попытка 2 когда заявка в друзья принята
    (vk.api.friends.areFriends as jest.Mock).mockReturnValueOnce([{
      friend_status: FriendStatusEnum.Friend,
      user_id: halfUser.mid,
    }] as FriendsFriendStatusEx[])
    const halfUsers2 = await meetHalfUserReadyToWitnessChat()
    expect(halfUsers2).toHaveLength(1)

    // отправилось сообщение в чат
    expect((vk.api.messages.send as jest.Mock).mock.calls).toHaveLength(1)
  })

  /**
   * Тестовый пользователь имеет статус Подтвержден, поэтому есть чат заверения и запускается синхронный сценарий с частичным заверением изменениями данных
   */
  it ('sync', async () => {
    halfUser = await createTestUser('halfUser',)
    const res = await request(app)
      .post('/api/users/updateProfile')
      .set('T-Authorization', halfUser.mid.toString())
      .send({...plain(halfUser), changeset:[], changesetTranslated:[]})

    expect(res.status).toEqual(200)
    // отправилось сообщение в чат
    expect((vk.api.messages.send as jest.Mock).mock.calls).toHaveLength(1)
  })
})

