import {Request, Response} from 'express'
import container from "@/di/container";
import {basename} from "path";
import error from "@api/error";

module.exports = function errorHandler(err: Error, req: Request, res: Response, next: Function) {
  res.status(201)
    .json(error(err))

  try {
    // постгрес кидает ошибку не в объекте ошибка, а в похожем по составу полей объекте непонятного класса
    container.createLogger({name: basename(__filename)}).error(err instanceof Error ? err : {err})
  } catch (error) {
  }

  next(err)
}
