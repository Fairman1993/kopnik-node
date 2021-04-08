import {User} from "@entity/user/User.entity";
import {getRepository} from "typeorm";
import StatusEnum from "@entity/user/StatusEnum";
import findWitness from "@/findWitness/findWitness";
import addChatUser from "@/vk/utils/addChatUser";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import transaction from "@/transaction/transaction";

/**
 * Перераспределяет заявки между заверителями с учетом зоны заверения
 * И возвращает перераспределенных полупользователей
 */
export default async function (halfUsers?: User[]): Promise<User[]> {
  const result: User[] = []

  if (!halfUsers) {
    halfUsers = await getRepository(User).find({
        where: {
          status: StatusEnum.Pending,
        },
        // take: 25,
        relations: ['witness']
      },
    )
  }

  for (let eachHalfUser of halfUsers) {
    if (!eachHalfUser.witnessChat?.id) {
      continue
    }
    await transaction( async(em)=> {
      let eachCorrectWitness = await findWitness(eachHalfUser)
      if (eachCorrectWitness.id != eachHalfUser.witness.id) {
        eachHalfUser.witness = eachCorrectWitness
        await em.save(User, eachHalfUser)
        await addChatUser(eachHalfUser.witnessChat, eachCorrectWitness, {visibleMessagesCount: 100})
        await sendToGroupChat(eachHalfUser.witnessChat, {
          message: `Здарова славяне!
        
          ${link(eachHalfUser, LinkMode.i)}, тебе назначен новый заверитель ${link(eachHalfUser.witness, LinkMode.i)}
          
          Во благо!`
        })
      }
    })
    result.push(eachHalfUser)
  }

  return result
}
