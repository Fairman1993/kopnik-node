import request from "supertest";
import {Base64} from 'js-base64';

import app from "@/app";
import {EntityManager, getManager,} from "typeorm";
import {User} from "@entity/user/User.entity";
import createUser from "@entity/user/test-utils/createTestUser";
import container from "@/di/container";
import passportCallback from "@api/middleware/passport/passportCallback";


describe('user', () => {
  const VK_TEST_USER = parseInt(process.env.VK_TEST_USER)

  beforeAll(async () => {
    await container.provideDatabase()
  })

  it('empty header', async () => {
    const res = await request(app)
      .get('/api/test/ping')
      .send()
    expect(res.status).toEqual(200)
  })

  it('new user', async () => {
    // удаляем пользователя
    // await getManager().query(`delete from users_closure where id_ancestor=${VK_TEST_USER} or id_descendant=${VK_TEST_USER}`)
    await getManager().query(`truncate users_closure`)
    await getManager().delete(User, {
      mid: parseInt(process.env.VK_TEST_USER),
    })
    const fakeProfile= {
      "id": 261824271,
      "username": "alexey2baranov",
      "displayName": "Алексей Баранов",
      "name": {
        "familyName": "Баранов",
        "givenName": "Алексей"
      },
      "gender": "male",
      "profileUrl": "http://vk.com/alexey2baranov",
      "photos": [
        {
          "value": "https://sun1-24.userapi.com/impf/c639321/v639321874/53f59/Td_OIljPT0w.jpg?size=200x0&quality=96&crop=126,1,827,827&sign=9ce8bd25dff8061a698f4526cefb8e5f&c_uniq_tag=Ha0-rwjPcYBX_YDI6xVoYss0W28PtkNQEYI5kOgdrHE&ava=1",
          "type": "photo_200"
        }
      ],

    }
    await passportCallback('accessToken', 'refreshToken', [], fakeProfile, (e, user) => {
      expect(user.id).toBeTruthy()
    })
  })

  it.only('existed user', async () => {
    // удаляем на всякий случай пользователя
    await getManager().query(`truncate users_closure`)
    await getManager().delete(User, {
      mid: VK_TEST_USER,
    })
    // создаем тестового пользователя
    await createUser('authenticate', {
      mid: VK_TEST_USER,
    })

    // пробуем прорваться
    const res = await request(app)
      .get('/api/test/ping')
      .set({'T-Authorization':(VK_TEST_USER.toString())})
      .send()
    expect(res.status).toEqual(200)
  })
})
