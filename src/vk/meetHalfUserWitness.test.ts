import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";

describe('meetHalfUserWitness', () => {
  let vk: VK

  beforeAll(async () => {
    await container.provideDatabase()
    await container.provideI18next()
    vk = container.vk
    vk.api.messages.send = jest.fn(vk.api.messages.send)
  })
  beforeEach(async () => {
    (vk.api.messages.send as jest.Mock).mockClear()
  })

  it('first time (new chat)', async () => {
    const result = await meetHalfUserWitness(testUser({witness_id: 1234}), testUser())
    expect(result).toBeInstanceOf(Chat)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('Борода')
  })
})

