import container from "@/di/container"
import {VK} from "vk-io";
import createTestUser from "@entity/user/test-utils/createTestUser";
import StatusEnum from "@entity/user/StatusEnum";
import resetWitnesses from "@/job/resetWitnesses/resetWitnesses";

import findWitness from "@/findWitness/findWitness";
import {User} from "@entity/user/User.entity";

jest.mock('@/findWitness/findWitness');

describe('resetWitnesses', () => {
  let vk: VK

  beforeAll(async () => {
    await container.provideDatabase()
    vk = container.vk
    vk.api.messages.addChatUser = jest.fn(vk.api.messages.addChatUser)
    vk.api.messages.send = jest.fn(vk.api.messages.send)

  })

  it('do', async () => {
    // создаю полупользователя
    const halfUser = await createTestUser('halfUser', {
      status: StatusEnum.Pending,
      witness: new User(1),
    })

    // создаю пользователя, который не должен попасть
    const witness = await createTestUser('witness', {
      isWitness: true,
    });

    (findWitness as jest.Mock).mockImplementation(() => witness)
    const result = await resetWitnesses([halfUser]);

    expect(result).toHaveLength(1)
    expect(result[0].witness.id).toBe(witness.id)
    expect((vk.api.messages.addChatUser as jest.Mock).mock.calls.length).toBe(1)
    expect((vk.api.messages.send as jest.Mock).mock.calls.length).toBe(1)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toMatch(halfUser.firstName)
    expect((vk.api.messages.send as jest.Mock).mock.calls[0][0].message).toMatch(witness.firstName)
  })
})

