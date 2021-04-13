import container from "@/di/container"
import {VK} from "vk-io";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import testUser from "@entity/user/test-utils/testUser";
import Chat from "@entity/Chat.entity";
import StatusEnum from "@entity/user/StatusEnum";
import konaz from "@entity/user/konaz";
import {User} from "@entity/user/User.entity";

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

  it('status=New', async () => {
    const result = await meetHalfUserWitness(testUser({witness: new User({mid: 1234})}), konaz(), StatusEnum.New, ['Имя', `Фамилия`])
    expect(result).toBeInstanceOf(Chat)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(testUser().firstName)
    // expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(konaz().firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('регистрац')
  })
  it('status=Pending', async () => {
    const result = await meetHalfUserWitness(testUser({witness: new User({mid: 1234})}), konaz(), StatusEnum.Pending, ['Имя', `Фамилия`])
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(testUser().firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('внес изменения в Личные данные')
  })
  it('status=Declined', async () => {
    const result = await meetHalfUserWitness(testUser({witness: new User({mid: 1234})}), konaz(), StatusEnum.Declined, ['Имя', `Фамилия`])
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(testUser().firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain(konaz().firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toContain('изменения')
  })
})

