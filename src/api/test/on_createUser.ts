import {Request, Response} from "express";
import response from "@api/response";
import createUser from "@entity/user/test-utils/createTestUser";
import parse from "@entity/user/parse";


/**
 * Обработчик создания пользователей из интеграционных тестов
 * Дурацкое название потому что есть просто бизнесс-логиковый createUser()
 *
 * @param req
 * @param res
 */
export default async function (req: Request, res: Response,) {
  const user = await createUser(null, parse(req.body))

  res.json(response(user.id))
}
