import container from "@/di/container"
import {VK} from "vk-io";
import {basename} from "path";
import testUser from "@entity/user/test-utils/testUser";
import meetKopa from "@/vk/meetKopa";
import konaz from "@entity/user/konaz";
import meetForeman from "@/vk/meetForeman";
import Chat from "@entity/Chat.entity";
import meetSubordinate from "@/vk/meetSubordinate";

describe.only('meetSubordinate', () => {
  let vk: VK

  beforeAll(async () => {
    await container.provideI18next()
    vk = container.vk
    vk.api.messages.send = jest.fn(vk.api.messages.send)
  })
  beforeEach(async () => {
    (vk.api.messages.send as jest.Mock).mockClear();
  })

  it('messageTen, messageSubordinate', async () => {
    await meetSubordinate(testUser(), konaz(),)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(konaz().firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(testUser().iof)

    expect((vk.api.messages.send as jest.Mock).mock.calls[1][0].message).toContain(testUser().firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[1][0].message).toContain(konaz().iof)
  })
})
