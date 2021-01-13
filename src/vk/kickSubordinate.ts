import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import removeChatUser from "@/vk/utils/removeChatUser";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import sendToDirect from "@/vk/utils/sendToDirect";
import KError from "@/error/KError";
import link from "@/vk/utils/link";

/**
 * Исключаю подчиненного из чата десятки
 */
export default async function (subordinate: User, kicker: User): Promise<void> {
  if (!subordinate.foreman){
    throw new KError('Foreman undefined' ,1500)
  }

  if (kicker===subordinate) {
    await sendToGroupChat(subordinate.foreman.tenChat, {
      message: `
      Здравия, братцы!
      Сообщаю вам, что ${link(subordinate)} принял решение выйти из десятки. 

      Исключаю его из вашего чата.
      Во благо!`
    })
  }
  else{
    await sendToGroupChat(subordinate.foreman.tenChat, {
      message: `
      Здравия, братцы!
      ${link(kicker)} исключил ${link(subordinate)} из десятки.
      Исключаю его из вашего чата.
      
      ${link(subordinate)}, не отчаивайся, это не всегда плохо.
      Если тебя исключили из десятки, найди другую десятку, с которой тебе будет по пути.
      
      Как бы не было, мы - один народ, и наша задача во всеобщем объединении!
      Во благо!`
    })
  }

  await removeChatUser(subordinate.foreman.tenChat, subordinate)
}
