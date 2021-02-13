import {User} from "@entity/user/User.entity";
import {getManager, getRepository} from "typeorm";
import StatusEnum from "@entity/user/StatusEnum";
import friends from "@/vk/utils/friends";
import FriendStatusEnum from "@/di/vk-io/FriendStatusEnum";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";

/**
 * Соединяет пользователей с заверителем в чате для заверения
 * Это вынесено в отдельную службу, потому что необходимо дождаться когда Святослав примет предложение в друзья
 */
export default async function (): Promise<User[]> {
  const result: User[] = []

  const halfUsersWaitWitnessChat = await getRepository(User).find({
    where: {
      status: StatusEnum.Pending,
      witnessChat: {
        id: null,
      }
    },
    relations: ['witness']
  })

  const friendStatuses = await friends(halfUsersWaitWitnessChat, {wait: false})
  for (let eachFriendStatus of friendStatuses) {
    if (eachFriendStatus.friend_status === FriendStatusEnum.Friend) {
      result.push(eachFriendStatus.user)
    }
  }

  for (let eachHalfUser of result) {
    eachHalfUser.witnessChat = await meetHalfUserWitness(eachHalfUser, eachHalfUser.witness)
    await getManager().update(User, eachHalfUser.id, {witnessChat: eachHalfUser.witnessChat})
  }
  return result
}
