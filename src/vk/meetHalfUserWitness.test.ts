import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";

describe('meetHalfUserWitness', () => {
  let vk: VK,
    VK_TEST_USER = parseInt(process.env.VK_TEST_USER)

  beforeAll(async () => {
    await container.provideDatabase()
    await container.provideI18next()
    vk = container.vk
  })

  it('success to new chat', async () => {
    const result = await meetHalfUserWitness(testUser({witness_id: VK_TEST_USER}), testUser())
    expect(result).toBeInstanceOf(Chat)
  })
})

