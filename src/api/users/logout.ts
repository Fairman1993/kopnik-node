import {Request, Response} from "express";
import context from "@/context/context";
import response from "@api/response";

/**
 *
 */
export default async function (req: Request, res: Response) {
  // context.set('user', null)
  (req as any).session = null
  res.json(response('ok'))
}
