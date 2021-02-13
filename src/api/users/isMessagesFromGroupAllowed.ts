import {Request, Response} from "express";
import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {getRepository} from "typeorm";
import {User} from "@entity/user/User.entity";
import response from "@api/response";
import StatusEnum from "@entity/user/StatusEnum";
import KError from "@/error/KError";
import {FriendActivityContext} from "vk-io";
import FriendStatusEnum from "@/di/vk-io/FriendStatusEnum";

/**
 * doc: https://vk.com/dev/friends.areFriends
 */
export default async function (req: Request, res: Response) {
  const logger = container.createLogger({name: basename(__filename),})

  const [areFriend] = await container.vk.api.friends.areFriends({
    user_ids: [context.user.mid],
    need_sign: 0,
  })

  res.json(response([FriendStatusEnum.Friend, FriendStatusEnum.HeSendRequest].includes(areFriend.friend_status)))
}
