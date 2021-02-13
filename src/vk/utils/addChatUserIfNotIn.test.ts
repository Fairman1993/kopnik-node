import container from "@/di/container"
import {VK} from "vk-io";
import {basename} from "path";
import userFactory from "@entity/user/test-utils/testUserFactory";
import createChat from "@/vk/utils/createChat";
import Chat from "@entity/Chat.entity";
import meet from "@/vk/meet";
import testUser from "@entity/user/test-utils/testUser";
import addChatUserIfNotIn from "@/vk/utils/addChatUserIfNotIn";
import {MessagesGetChatPreviewParams} from "vk-io/lib/api/schemas/params";
import {MessagesGetChatPreviewResponse} from "vk-io/lib/api/schemas/responses";

describe('createChat', () => {
  let vk: VK

  beforeAll(async () => {
    await container.provideDatabase()
    vk = container.vk
    vk.api.messages.addChatUser = jest.fn(vk.api.messages.addChatUser)
    vk.api.messages.getChatPreview= jest.fn(vk.api.messages.getChatPreview)
  })

  it('user already in', async () => {
    // мокаю, что юзер уже в чате
    (vk.api.messages.getChatPreview as jest.Mock).mockReturnValueOnce({
      preview:{
        members:[testUser().mid]
      }
    })
    await addChatUserIfNotIn(await createChat(basename(__filename), [testUser()]), testUser())
    expect((vk.api.messages.addChatUser as jest.Mock).mock.calls.length).toBe(0)
  })
})

