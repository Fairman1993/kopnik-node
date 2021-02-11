import express from "express";

import 'express-async-errors'
import bodyParser from "body-parser";
import httpContext from 'express-cls-hooked'
import cors from 'cors'
import passport from 'passport'
import {Strategy as VKontakteStrategy} from 'passport-vk-strategy'
import cookieParser from 'cookie-parser'
// import expressSession from 'express-session'
import cookieSession from 'cookie-session'


import welcome from "@/api/middleware/welcome"
import ping from "@api/test/ping";
import error from "@api/test/error";
import user from "@api/middleware/user/user";
import create from "@api/middleware/newUser_need_remove";
import get from "@api/users/get";
import login from "@api/test/login_need_remove";
import on_createUser from "@api/test/on_createUser";
import on_authorize from "@api/test/on_authorize";
import db from "@api/middleware/db";
import authorize from "@api/middleware/authorize";
import getEx from "@api/users/getEx";
import getWitnessRequests from "@api/users/getWitnessRequests";
import getTopInsideSquare from "@api/users/getTopInsideSquare";
import updateProfile from "@api/users/updateProfile";
import updateLocale from "@api/users/updateLocale";
import resolveWitnessRequest from "@api/users/resolveWitnessRequest";
import isMessagesFromGroupAllowed from "@api/users/isMessagesFromGroupAllowed";
import putForemanRequest from "@api/users/putForemanRequest";
import getForemanRequests from "@api/users/getForemanRequests";
import resolveForemanRequest from "@api/users/resolveForemanRequest";
import resetForeman from "@api/users/resetForeman";
import getSubordinates from "@api/users/getSubordinates";
import getForeman from "@api/users/getForeman";
import StatusEnum from "@entity/user/StatusEnum";
import RoleEnum from "@entity/user/RoleEnum";
import {getManager, Transaction} from "typeorm";
import inviteKopa from "@api/users/inviteKopa";
import container from "@/di/container";
import {User} from "@entity/user/User.entity";
import passportCallback from "@api/middleware/passport/passportCallback";
import logout from "@api/users/logout";
import req_id from "@api/middleware/req_id"

const app = express()

app.use(httpContext.middleware)
app.use(req_id)

app.use(cors({
  origin: ['http://localhost:8080', 'https://localhost:8080', 'https://staging.kopnik.org', 'https://kopnik.org',],
  credentials: true,
}))


app.use(cookieParser())
app.use(bodyParser.json())
// app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(cookieSession({
  name: 'sessionId',
  secret: process.env.COOKIE_SECRET,

  // Cookie Options
  maxAge: 7 * 24 * 60 * 60e3 * 1000,
  sameSite: false,
  secure: false,
  httpOnly: true,
}))

// vk auth
const pass = passport
app.use(pass.initialize());
app.use(pass.session());
// https://vk.com/editapp?id=7210289&section=options
pass.use(new VKontakteStrategy({
    clientID: process.env.VK_CLIENT_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: process.env.VK_CLIENT_SECRET,
    callbackURL: container.constants.auth.callbackURL,
    lang: 'ru',
    apiVersion: '5.126'
  },
  passportCallback
))
passport.serializeUser(function (data, done) {
  done(null, data)
})
passport.deserializeUser(function (data, done) {
  done(null, data)
})
app.get('/auth/vkontakte', pass.authenticate('vkontakte'))
app.get('/auth/vkontakte/callback',
  pass.authenticate('vkontakte', {
    successRedirect: container.constants.auth.successRedirect,
    failureRedirect: container.constants.auth.failureRedirect,
  })
)

// middleware after auth
app.use(db)
app.use(user)
app.use(welcome)

// users
app.get('/api/users/get', authorize(), get)
app.get('/api/users/getEx', authorize(), getEx)
app.get('/api/users/getWitnessRequests', authorize(), getWitnessRequests)
app.get('/api/users/getTopInsideSquare', authorize(), getTopInsideSquare)
app.post('/api/users/updateProfile', authorize(), updateProfile)
app.post('/api/users/updateLocale', authorize(), updateLocale)
app.post('/api/users/resolveWitnessRequest', authorize(), resolveWitnessRequest)
app.get('/api/users/isMessagesFromGroupAllowed', authorize(), isMessagesFromGroupAllowed)
app.post('/api/users/inviteKopa', authorize({
  statuses: [StatusEnum.Confirmed],
  roles: [RoleEnum.Kopnik, RoleEnum.DanilovKopnik,]
}), inviteKopa)
app.get('/api/users/logout', authorize(), logout)

// tree
app.post('/api/users/putForemanRequest', authorize({
  statuses: [StatusEnum.Confirmed],
  roles: [RoleEnum.Kopnik, RoleEnum.DanilovKopnik, RoleEnum.FutureKopnik]
}), putForemanRequest)
app.get('/api/users/getForemanRequests', authorize(), getForemanRequests)
app.post('/api/users/resolveForemanRequest', authorize(), resolveForemanRequest)
app.post('/api/users/resetForeman', authorize(), resetForeman)
app.get('/api/users/getSubordinates', authorize(), getSubordinates)
// app.get('/api/users/getForeman', authorize(), getForeman)


//test
app.get('/api/test/ping', ping)
app.get('/api/test/error', error)
app.post('/api/test/createUser', on_createUser)
app.get('/api/test/authorize', authorize(), on_authorize)
app.get('/api/test/login/:id', login)

// обработчик ошибок должен подключаться последним use() https://expressjs.com/ru/guide/error-handling.html
app.use(require('@api/middleware/errorHandler'))

export default app
