import StatusEnum from "@entity/user/StatusEnum";
import RoleEnum from "@entity/user/RoleEnum";
import Chat from "@entity/Chat.entity";

export default interface IUserPlain {
  id: number
  mid: number
  foreman: IUserPlain
  subordinates: IUserPlain[]
  rank: number
  foremanRequest: IUserPlain
  foremanRequests: IUserPlain[]
  witness: IUserPlain
  witnessRequests: IUserPlain[]
  status: StatusEnum
  role: RoleEnum
  firstName: string
  lastName: string
  patronymic: string
  locale: string
  domain: string
  photo: string
  // birthYear: number
  // passport: string
  location: {
    lat: number,
    lng: number
  }
  isWitness: boolean
  witnessRadius: number
  witnessChatInviteLink: string
  tenChatInviteLink: string
}
