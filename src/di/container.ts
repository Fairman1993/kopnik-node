import {Container} from "inversify";
import {Connection} from "typeorm/index";
import TYPES from "@/di/TYPES";
import Logger from "bunyan";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import constants, {IConstants} from "@/di/constants";
import IDbProvider from "@/di/db/IDbProvider";
import IVKProvider from "@/di/vk-io/IVKProvider";
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

  get provideVk(): IVKProvider {
    return this.get<IVKProvider>(TYPES.vkProvider)
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

// vk
import "@/di/vk-io/vk-io"

// ip-api
import "@/di/ip-api/ip-api"
import ipApi from "@/di/ip-api/ipApi";


