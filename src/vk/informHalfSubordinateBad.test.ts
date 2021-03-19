import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";
import informHalfUser from "@/vk/informHalfUser";
import StatusEnum from "@entity/user/StatusEnum";
import konaz from "@entity/user/konaz";
import informHalfForeman from "@/vk/informHalfForeman";
import informHalfForemanBad from "@/vk/informHalfForemanBad";
import informHalfSubordinateBad from "@/vk/informHalfSubordinateBad";

describe('informHalfSubordinateBad', () => {
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

  it('message', async () => {
    await informHalfSubordinateBad(testUser(),konaz(), )
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toMatch(/Борода.+\s.+Светослав/)
  })
})

