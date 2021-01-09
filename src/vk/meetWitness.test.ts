import container from "@/di/container"
import {VK} from "vk-io";
import meetWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";

describe('meetWitness', () => {
  let vk: VK,
    VK_TEST_USER = parseInt(process.env.VK_TEST_USER)

  beforeAll(async () => {
    await container.provideDatabase()
    vk = container.vk
  })

  it('success to new chat', async () => {
    const result = await meetWitness(testUser({witness_id: VK_TEST_USER}), testUser())
    expect(result).toBeInstanceOf(Chat)
  })
})

