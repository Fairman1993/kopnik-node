import {User} from "@entity/user/User.entity";

/**
 *
 * @param user
 * @param options
 */
export default function (user: User, options: { isCurrentUser?: boolean, isCurrentUserForeman?: boolean, isCurrentUserSubordinate?: boolean, isCurrentUserWitnessRequest?: boolean, isCurrentUserSubordinateRequest?: boolean } = {}) {
  const result = {
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
    status: user.status,
    rank: user.rank,

    passport: user.passport,
    witness_id: user.witness?.id || null,
    foremanRequest_id: user.foremanRequest?.id || null,
    foreman_id: user.foreman?.id || null,
    subordinates: user.subordinates?.map(eachSubordinate => eachSubordinate.id),
    foremanRequests: user.foremanRequests?.map(eachSubordinateRequest => eachSubordinateRequest.id),
    witnessRequests: user.witnessRequests?.map(eachWitnessRequest => eachWitnessRequest.id),

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
    delete result.witness_id
  }
  // foremanRequest
  if (!options.isCurrentUser && !options.isCurrentUserSubordinateRequest) {
    delete result.foremanRequest_id
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
