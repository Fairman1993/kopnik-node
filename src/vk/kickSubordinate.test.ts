import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";
import informHalfUser from "@/vk/informHalfUser";
import StatusEnum from "@entity/user/StatusEnum";
import konaz from "@entity/user/konaz";
import informHalfForeman from "@/vk/informHalfForeman";
import kickSubordinate from "@/vk/kickSubordinate";

describe('informHalfForeman', () => {
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

  it('sub kick himself', async () => {
    const subordinate = testUser()
    subordinate.foreman = konaz()
    subordinate.foreman.tenChat = new Chat(1234) // необходимо внутри kickSubordinate

    await kickSubordinate(subordinate, subordinate)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).not.toContain('десятка')
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toMatch(/Борода.+принял решение/)
  })
  it('foreman kick sub', async () => {
    const subordinate = testUser()
    subordinate.foreman = konaz()
    subordinate.foreman.tenChat = new Chat(1234) // необходимо внутри kickSubordinate

    await kickSubordinate(subordinate, subordinate.foreman)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toMatch(/Светослав.+исключил.+Борода/)
  })
  it('foreman rank>1', async () => {
    const subordinate = testUser()
    subordinate.foreman = konaz()
    subordinate.foreman.rank = 2
    subordinate.foreman.tenChat = new Chat(1234) // необходимо внутри kickSubordinate

    await kickSubordinate(subordinate, subordinate.foreman)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('десятка')
  })
})

