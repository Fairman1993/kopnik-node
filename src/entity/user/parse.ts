import {User} from "@entity/user/User.entity";
import plainRelation from "@entity/user/plainRelation";
import IUserPlain from "@entity/user/IUserPlain";
import plainRelations from "@entity/user/plainRelations";
import {FieldsOfType} from "@entity/types";
import Chat from "@entity/Chat.entity";


export default function parse(plain: IUserPlain,): User {
  const result = new User()
  mergeScalar(result, 'id', plain.id)

  mergeScalar(result, 'firstName', plain.firstName)
  mergeScalar(result, 'lastName', plain.lastName)
  mergeScalar(result, 'patronymic', plain.patronymic)
  mergeScalar(result, 'photo', plain.photo)

  mergeScalar(result, 'birthYear', plain.birthYear)
  mergeScalar(result, 'role', plain.role)
  mergeScalar(result, 'isWitness', plain.isWitness)
  mergeScalar(result, 'witnessRadius', plain.witnessRadius)
  mergeScalar(result, 'status', plain.status)
  mergeScalar(result, 'rank', plain.rank)
  mergeScalar(result, 'domain', plain.domain)
  mergeScalar(result, 'passport', plain.passport)
  mergeScalar(result, 'mid', plain.mid)

  mergeScalar(result, 'locale', plain.locale)

  mergeRelation<User, User>(result, 'witness', plain.witness)
  mergeRelation<User, User>(result, 'foremanRequest', plain.foremanRequest)
  mergeRelation<User, User>(result, 'foreman', plain.foreman)

  // chats
  mergeScalar(result, 'witnessChat', (plain as any).witnessChat)
  mergeScalar(result, 'tenChat', (plain as any).tenChat)

  // location
  if (plain.location) {
    result.latitude = plain.location.lat
    result.longitude = plain.location.lng
  }

  return result
}


function mergeScalar<Entity>(entity: Entity, field: keyof Entity, value) {
  if (value !== undefined) {
    entity[field] = value
  }
}

function mergeRelation<Entity, FieldType>(entity: Entity, field: FieldsOfType<Entity, FieldType>, value) {
  if (value) {
    entity[field] = new User(value) as any
    // не работает on_createTestUser.test (entity[field] as any).mid = 1234 // зачем-то??? видимо тесты
  }
}

function mergeRelationCollection<Entity, FieldType>(entity: Entity, field: FieldsOfType<Entity, FieldType>, value) {
  if (value) {
    entity[field] = value.map(eachCollectionItemId => new User(eachCollectionItemId))
  }
}
