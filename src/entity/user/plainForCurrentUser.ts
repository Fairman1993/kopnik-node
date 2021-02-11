import {User} from "@entity/user/User.entity";
import context from "@/context/context";
import plain from "@entity/user/plain";

/**
 * обертка над plain() которая делается относительно текущего пользователя
 * @param user
 */
export default function (user: User) {
  const currentUser= context.user
  return plain(user, {
    isCurrentUser: user.id == currentUser?.id,
    isCurrentUserForeman: user.id == currentUser?.foreman?.id,
    isCurrentUserWitnessRequest: user?.witness?.id == currentUser?.id,
    isCurrentUserSubordinate: !!currentUser?.subordinates?.find(eachSubordinate => eachSubordinate.id == user.id),
    isCurrentUserSubordinateRequest:  !!currentUser?.foremanRequests?.find(eachSubordinateRequest => eachSubordinateRequest.id == user.id),
  })
}
