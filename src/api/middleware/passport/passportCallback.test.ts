import request from "supertest";
import {Base64} from 'js-base64';

import app from "@/app";
import {EntityManager, getManager, getRepository,} from "typeorm";
import {User} from "@entity/user/User.entity";
import createUser from "@entity/user/test-utils/createTestUser";
import container from "@/di/container";
import passportCallback from "@api/middleware/passport/passportCallback";


describe('passportCallback', () => {
  const VK_TEST_USER = parseInt(process.env.VK_TEST_USER)

  beforeAll(async () => {
    await container.provideDatabase()
  })


  it('new user', async () => {
    // удаляем пользователя
    const testUser= await getRepository(User).findOne({
      where:{
        mid: VK_TEST_USER
      }
    })

    if (testUser) {
      await getManager().query(`truncate users_closure`)
      await getManager().delete(User, {
        foreman: testUser.id,
      })
      await getManager().delete(User, {
        witness: testUser.id,
      })
      await getManager().delete(User, testUser.id)
    }
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
})
