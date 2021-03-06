import container from "@/di/container"
import {VK} from "vk-io";
import {basename} from "path";
import testUser from "@entity/user/test-utils/testUser";
import meetKopa from "@/vk/meetKopa";
import konaz from "@entity/user/konaz";
import meetForeman from "@/vk/meetForeman";
import Chat from "@entity/Chat.entity";

describe.only('meetKopa', () => {
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

  it('title, message', async () => {
    const result = await meetKopa(basename(__filename), [testUser(), konaz()],)
    expect(result).toBeInstanceOf(Chat)
    expect((vk.api.messages.createChat as jest.Mock).mock.calls[0][0].title).toContain(basename(__filename))
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(testUser().iof)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(basename(__filename))
  })
})
