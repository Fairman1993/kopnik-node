import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";
import informHalfUser from "@/vk/informHalfUser";
import StatusEnum from "@entity/user/StatusEnum";
import konaz from "@entity/user/konaz";

describe('informHalfUser', () => {
  let vk: VK,
    VK_TEST_USER = parseInt(process.env.VK_TEST_USER)

  beforeAll(async () => {
    await container.provideDatabase()
    await container.provideI18next()
    vk = container.vk
    vk.api.messages.send = jest.fn(vk.api.messages.send)
  })
  beforeEach(async () => {
    (vk.api.messages.send as jest.Mock).mockClear()
  })

  it('confirm', async () => {
    await informHalfUser(testUser({status: StatusEnum.Confirmed, witnessChat: new Chat(1234, 'link/link')}), konaz())
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('Борода')
  })
  it('decline', async () => {
    await informHalfUser(testUser({status: StatusEnum.Declined, witnessChat: new Chat(1234, 'link/link')}), konaz())
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('Борода')
  })
})

