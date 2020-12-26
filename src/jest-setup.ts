import dotenv from 'dotenv'
import container from "@/di/container";

dotenv.config({
  // path: '.env.test',
  path: '.env'
})

import {types} from 'pg'
types.setTypeParser(20, Number);
