import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";
import meetForeman from "@/vk/meetForeman";

describe('meetForeman', () => {
  let vk: VK

  beforeAll(async () => {
    await container.provideDatabase()
    await container.provideI18next()
    vk = container.vk
    vk.api.messages.send = jest.fn(vk.api.messages.send)
    vk.api.messages.createChat = jest.fn(vk.api.messages.createChat)
  })
  beforeEach(async () => {
    (vk.api.messages.send as jest.Mock).mockClear();
    (vk.api.messages.createChat as jest.Mock).mockClear();
  })

  it('do', async () => {
    const result = await meetForeman(testUser(), )
    expect(result).toBeInstanceOf(Chat)
    expect((vk.api.messages.createChat as jest.Mock).mock.calls[0][0].title).toContain('Борода')
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('Борода')
  })
})

