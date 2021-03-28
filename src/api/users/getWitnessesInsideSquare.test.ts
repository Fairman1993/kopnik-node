import container from "@/di/container"
import {EntityManager} from "typeorm"
import {User} from "@entity/user/User.entity"
import createTestUser from "@entity/user/test-utils/createTestUser";
import request from "supertest";
import app from "@/app";
import StatusEnum from "@entity/user/StatusEnum";

describe('getWitnessesInsideSquare', () => {
  let halfForeman: User,
    halfSubordinate: User,
    em: EntityManager

  beforeAll(async () => {
    await container.provideDatabase()
  })

  it('success', async () => {
    const witness = await createTestUser('witness', {
      isWitness: true,
      location: {
        lat: 50,
        lng: 50,
      }
    })
    // container.constants.logger.console.shortSQL= false
    const res = await request(app)
      .get('/api/users/getWitnessesInsideSquare?x1=49&y1=49&x2=51&y2=51')
      .set('T-Authorization', witness.mid.toString())
      .send()
    expect(res.status).toEqual(200)
    expect(res.body.response.map(eachWitness => eachWitness.id)).toContain(witness.id)
  })

  it('401', async () => {
    // container.constants.logger.console.shortSQL= false
    const res = await request(app)
      .get('/api/users/getWitnessesInsideSquare?x1=49&y1=49&x2=51&y2=51')
      .send()
    expect(res.status).toEqual(201)
    expect(res.body.error.error_code).toBe(1401)
  })

  it('403', async () => {
    const main = await createTestUser('main', {
      status: StatusEnum.New,
    })
    // container.constants.logger.console.shortSQL= false
    const res = await request(app)
      .get('/api/users/getWitnessesInsideSquare?x1=49&y1=49&x2=51&y2=51')
      .set('T-Authorization', main.mid.toString())
      .send()
    expect(res.status).toEqual(201)
    expect(res.body.error.error_code).toBe(1403)
  })
})

