import {
  Column,
} from "typeorm";

// import {EntityWithSequence, NextVal} from "typeorm-sequence";

export default class Chat {
  @Column({nullable: true,})
  inviteLink: string

  @Column({type: 'bigint', nullable: true,})
  id: number;

  constructor(id?: number, inviteLink?: string) {
    this.id = id
    this.inviteLink = inviteLink
  }
}
