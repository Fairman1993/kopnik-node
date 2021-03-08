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

  it('existed user', async () => {
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
