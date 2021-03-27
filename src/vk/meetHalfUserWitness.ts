import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import KError from "@/error/KError";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import StatusEnum from "@entity/user/StatusEnum";
import list from "@/vk/utils/list";
import testUser from "@entity/user/test-utils/testUser";

export default async function (halfUser: User, witness: User, prevStatus: StatusEnum, changesetTranslated:string[]): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  if (!halfUser.witness?.mid) {
    throw new KError(`Empty witness`, 1500)
  }

  // смысла больше нет, потому что это вызывается из main.ts только когда есть дружба
  // await friends([halfUser, halfUser.witness], {wait: true}, async () => {

  // свожу в чате с заверителем
  let messageKey
  switch(prevStatus){
    case StatusEnum.New:
      messageKey= 'messageNew'
      break
    case StatusEnum.Pending:
      messageKey='messagePending'
      break
    default:
      messageKey='repeat'
      break
  }

  const t= container.i18next.getFixedT(halfUser.locale, 'meetHalfUserWitness')
  result = await meet(t('title', {halfUser:halfUser.iof}),
    [halfUser, witness, testUser()],
    {
      chat: halfUser.witnessChat,
      data: {
        message: t(messageKey, {halfUser: link(halfUser, LinkMode.i), witness: link(witness, LinkMode.i), changeset: list(changesetTranslated)})
      }
    })

  return result
}
