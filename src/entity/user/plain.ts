import {User} from "@entity/user/User.entity";
import plainRelation from "@entity/user/plainRelation";
import IUserPlain from "@entity/user/IUserPlain";
import plainRelations from "@entity/user/plainRelations";


/**
 *
 * @param user
 * @param options
 */
export default function plain(user: User, options: { isCurrentUser?: boolean, isCurrentUserForeman?: boolean, isCurrentUserSubordinate?: boolean, isCurrentUserWitnessRequest?: boolean, isCurrentUserSubordinateRequest?: boolean } = {}): IUserPlain {
  const result: IUserPlain = {
    id: user.id,
    locale: user.locale,
    firstName: user.firstName,
    lastName: user.lastName,
    patronymic: user.patronymic,
    photo: user.photo,
    location: {lat: user.latitude, lng: user.longitude},
    birthYear: user.birthYear,
    role: user.role,
    isWitness: user.isWitness,
    witnessRadius: user.witnessRadius,
    status: user.status,
    rank: user.rank,
    domain: user.domain,

    passport: user.passport,
    witness: plainRelation(user.witness),
    foremanRequest: plainRelation(user.foremanRequest),
    foreman: plainRelation(user.foreman),
    subordinates: plainRelations(user.subordinates),
    foremanRequests: plainRelations(user.foremanRequests),
    witnessRequests: plainRelations(user.witnessRequests),

    witnessChatInviteLink: user.witnessChat?.inviteLink,
    tenChatInviteLink: user.tenChat?.inviteLink,
    mid: user.mid,
  }
  // passport
  if (!options.isCurrentUser && !options.isCurrentUserWitnessRequest) {
    delete result.passport
  }
  // witness
  if (!options.isCurrentUser && !options.isCurrentUserWitnessRequest) {
    delete result.witness
  }
  // foremanRequest
  if (!options.isCurrentUser && !options.isCurrentUserSubordinateRequest) {
    delete result.foremanRequest
  }
  // foremanRequests
  if (!options.isCurrentUser) {
    delete result.foremanRequests
  }
  // witnessRequests
  if (!options.isCurrentUser) {
    delete result.witnessRequests
  }

  // witnessChatId? witnessChatInviteLink
  if (!options.isCurrentUser && !options.isCurrentUserWitnessRequest) {
    delete result.witnessChatInviteLink
  }

  //   tenChatId, tenChatInviteLink
  if (!options.isCurrentUser && !options.isCurrentUserForeman) {
    delete result.tenChatInviteLink
  }

  if (process.env.NODE_ENV !== 'test') {
    delete result.mid
  }

  return result
}
