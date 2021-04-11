import {User} from "@entity/user/User.entity";
import plain from "@entity/user/plain";
import IUserPlain from "@entity/user/IUserPlain";

type PlainRelation<R> = R extends User ? typeof plain : (typeof plain)[]


/**
 * Корректно оборачивает в plain  связь сущности
 * связь может быть null, undefined, object
 */
export default function plainRelation(relation: User): IUserPlain {
  if (relation) {
    return plain(relation)
  } else {
    return relation as any
  }
}
