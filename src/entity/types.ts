import {User} from "@entity/user/User.entity";

export type Plain<T> = {
  [key in FieldsOfType<T, Date>] : string
} & SubType<T, number> & SubType<T, string>

export type BaseWithNever<Base, Condition> = {
  [Key in keyof Base]:
  Base[Key] extends Condition ? Key : never
}

export type FieldsOfType<Base, Type> =
  BaseWithNever<Base, Type>[keyof Base];

export type SubType<Base, Condition> =
  Pick<Base, FieldsOfType<Base, Condition>>;


let a: FieldsOfType<User, User>
// a="foreman"
