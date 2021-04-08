import {Container} from "inversify";
import {Connection} from "typeorm/index";
import TYPES from "@/di/TYPES";
import Logger from "bunyan";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import constants, {IConstants} from "@/di/constants";
import IDbProvider from "@/di/db/IDbProvider";
import {VK} from "vk-io";

export class CustomContainer extends Container {
  get constants(): IConstants {
    return this.get<IConstants>(TYPES.constants)
  }

  createLogger(options: any = {}): Logger {
    return this.get<(options) => Logger>(TYPES.createLogger)(options)
  }

  get dbOptions(): PostgresConnectionOptions {
    return container.get<PostgresConnectionOptions>(TYPES.dbOptions)
  }

  get db(): Connection {
    return container.get<Connection>(TYPES.db)
  }

  get provideDatabase(): IDbProvider {
    return this.get<IDbProvider>(TYPES.dbProvider)
  }
  get i18next(): typeof i18next {
    return container.get<typeof i18next>(TYPES.i18Next)
  }

  get provideI18next(): I18NextProvider {
    return this.get<I18NextProvider>(TYPES.i18NextProvider)
  }

  get vk(): VK {
    return this.get<VK>(TYPES.vkIo)
  }

  get ipApi(): typeof ipApi{
    return this.get<typeof ipApi>(TYPES.ipApi)
  }
}

const container = new CustomContainer();
export default container;

// constants
container.bind<IConstants>(TYPES.constants).toDynamicValue(context => {
  return constants[process.env.NODE_ENV]
}).inSingletonScope()

// createLogger
import './createLogger/createLogger'

// db
import './db/dbOptions'
import './db/db'

// i18next
import './i18next/i18next'

// vk
import "@/di/vk-io/vk-io"

// ip-api
import "@/di/ip-api/ip-api"
import ipApi from "@/di/ip-api/ipApi";
import i18next from "i18next";
import I18NextProvider from "@/di/i18next/I18NextProvider";


