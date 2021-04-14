import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  ManyToOne,
  TreeParent,
  TreeChildren,
  OneToMany,
  Generated, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Index, DeepPartial
} from "typeorm";
import RoleEnum from "@entity/user/RoleEnum";
import StatusEnum from "@entity/user/StatusEnum";
// import {OAuth} from "@entity/user/OAuth";
import LocaleEnum from "@entity/LocaleEnum";
import merge from "@entity/user/merge";
import Chat from "@entity/Chat.entity";

// import {EntityWithSequence, NextVal} from "typeorm-sequence";

@Entity('users')
@Tree("closure-table")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("mid", {unique: true})
  @Column({type: 'bigint',})
  mid: number

  // @ManyToOne(() => User, foreman => foreman.subordinates, {eager: true})
  @TreeParent()
  foreman: User

  @TreeChildren()
  subordinates: User[]

  @Column({default: 1})
  rank: number

  @ManyToOne(() => User, foreman => foreman.foremanRequests, /*{eager: true}*/)
  foremanRequest: User

  @OneToMany(() => User, request => request.foremanRequest)
  foremanRequests: User[]

  @ManyToOne(() => User, witness => witness.witnessRequests, /*{eager: true}*/)
  witness: User

  @OneToMany(() => User, request => request.witness)
  witnessRequests: User[]

  @Column({enum: StatusEnum, default: StatusEnum.New})
  status: StatusEnum

  @Column({enum: RoleEnum, name: 'role', nullable: true,})
  role: RoleEnum

  @Column({})
  firstName: string

  @Column({})
  lastName: string

  @Column({nullable: true,})
  patronymic: string

  @Column({enum: LocaleEnum, default: LocaleEnum.ru})
  locale: string

  @Column({})
  domain: string

  @Column()
  photo: string

  @Column({nullable: true,})
  birthYear: number

  @Column({nullable: true,})
  passport: string

  @Index()
  @Column({type: 'float', default: 0,})
  latitude: number

  @Index()
  @Column({type: 'float', default: 0,})
  longitude: number

  @Column({default: false})
  isWitness: boolean

  @Column({type: 'float', nullable: true,})
  witnessRadius: number

  @Column(type => Chat,)
  witnessChat: Chat

  @Column(type => Chat,)
  tenChat: Chat

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  get iof() {
    return `${this.firstName} ${this.patronymic} ${this.lastName}`
  }

  get if() {
    return `${this.firstName} ${this.lastName}`
  }

  get io() {
    return `${this.firstName} ${this.patronymic}`
  }

  constructor(init?: number | Partial<User>) {
    if (typeof init === 'number') {
      this.id = init
    } else if (typeof init === 'object') {
      merge(this, init)
    }
  }

}
