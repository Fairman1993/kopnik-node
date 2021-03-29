import {User} from "@entity/user/User.entity";
import {getRepository} from "typeorm";
import StatusEnum from "@entity/user/StatusEnum";
import findWitness from "@/findWitness/findWitness";
import addChatUser from "@/vk/utils/addChatUser";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

/**
 * Перераспределяет заявки между заверителями с учетом зоны заверения
 */
export default async function (halfUsers?: User[]): Promise<User[]> {
  const result: User[] = []

  if (!halfUsers) {
    halfUsers = await getRepository(User).find({
        where: {
          status: StatusEnum.Pending,
          id: 1,
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
    let eachCorrectWitness = await findWitness(eachHalfUser)
    if (eachCorrectWitness.id != eachHalfUser.witness.id) {
      eachHalfUser.witness = eachCorrectWitness
      await getRepository(User).save(eachHalfUser)
      await addChatUser(eachHalfUser.witnessChat, eachCorrectWitness)
      await sendToGroupChat(eachHalfUser.witnessChat, {
        message: `Здарова славяне!
        
        ${link(eachHalfUser, LinkMode.i)}, тебе назначен новый заверитель ${link(eachHalfUser.witness, LinkMode.i)}
        
        Во благо!`
      })
      result.push(eachHalfUser)
    }
  }

  return result
}
