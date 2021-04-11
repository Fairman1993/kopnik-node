import {User} from "@entity/user/User.entity";
import plain from "@entity/user/plain";
import IUserPlain from "@entity/user/IUserPlain";

type PlainRelation<R> = R extends User ? typeof plain : (typeof plain)[]


/**
 * Корректно оборачивает в plain  связь сущности
 * связь может быть undefined, object[]
 */
export default function plainRelations(relations: User[]): IUserPlain[] {
  if (Array.isArray(relations)) {
    return relations.map(eachRelation => plain(eachRelation))
  }
  else {
    return undefined
  }
}
