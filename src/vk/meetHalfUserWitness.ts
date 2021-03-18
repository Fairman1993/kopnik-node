import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import KError from "@/error/KError";
import friends from "@/vk/utils/friends";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";

export default async function (halfUser: User, witness: User): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  if (!halfUser.witness?.mid) {
    throw new KError(`Empty witness`, 1500)
  }

  // смысла больше нет, потому что это вызывается из main.ts только когда есть дружба
  // await friends([halfUser, halfUser.witness], {wait: true}, async () => {

  // свожу в чате с заверителем
  result = await meet(container.i18next.t('meetHalfUserWitness:title', {halfUser}),
    [halfUser, halfUser.witness,],
    {
      chat: halfUser.witnessChat,
      data: {
        message: container.i18next.t('meetHalfUserWitness:message', {halfUserLink: link(halfUser, LinkMode.i)})
      }
    })

  return result
}
