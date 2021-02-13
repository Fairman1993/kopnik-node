import container from "@/di/container"
import {VK} from "vk-io";
import meet from "@/vk/meet";
import {basename} from "path";
import testUser from "@entity/user/test-utils/testUser";
import createChat from "@/vk/utils/createChat";
import Chat from "@entity/Chat.entity";

describe('meet', () => {
  let vk: VK,
    sendOriginal: any

  beforeAll(async () => {
    await container.provideDatabase()
    vk = container.vk
    sendOriginal= vk.api.messages.send
  })

  beforeEach(()=>{
    container.vk.api.messages.send= sendOriginal
  })

  it('success to new chat', async () => {
    container.vk.api.messages.send= jest.fn(container.vk.api.messages.send)
    const result = await meet(basename(__filename), [testUser()], {data: {message: 'hello!'}})
    expect(result).toBeInstanceOf(Chat)
    expect((vk.api.messages.send as any).mock.calls.length).toBe(1)
  })
  it('success to old chat', async () => {
    const chat = await createChat(basename(__filename), [testUser()])
    const result = await meet(basename(__filename), [testUser()], {chat, data: {message: 'hello!'}})
    expect(result).toBeUndefined()
  })

})

