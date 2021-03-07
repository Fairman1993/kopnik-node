export interface IConstants {
  auth:{
    callbackURL:string,
    successRedirect: string,
    failureRedirect: string,
  },
  db: {
    logging?: boolean,
    synchronize?: boolean,
  },
  messaging:{
    waitFriendDelay:number,
    baseClientUrl: string,
    checkSvetoslavFriendshipInterval: number,
  }

}

const constants = {
  development: {
    auth:{
      callbackURL: 'https://localhost:8081/auth/vkontakte/callback',
      successRedirect: 'http://localhost:8080',
      failureRedirect: 'http://localhost:8080/thanks'
    },
    db: {
      "synchronize": false,
      "logging": true,
    },
    messaging: {
      waitFriendDelay: 15000,
      baseClientUrl: 'https://localhost:8080/',
      checkSvetoslavFriendshipInterval: 60000,
    }
  },
  test: {
    auth:{
      callbackURL: 'https://localhost:8081/auth/vkontakte/callback',
      successRedirect: 'http://localhost:8080',
      failureRedirect: 'http://localhost:8080/thanks'
    },
    db: {
      "synchronize": false,
      "logging": true,
    },
    messaging: {
      waitFriendDelay: 1,
      baseClientUrl: 'https://localhost:8080/',
      checkSvetoslavFriendshipInterval: 6000000,
    }
  },
  production: {
    auth:{
      callbackURL: 'https://kopnik.org/auth/vkontakte/callback',
      successRedirect: 'https://kopnik.org',
      failureRedirect: 'https://kopnik.org'
    },
    db: {
      "synchronize": false,
      "logging": true,
    },
    messaging: {
      waitFriendDelay: 60000,
      baseClientUrl: 'https://kopnik.org/',
      checkSvetoslavFriendshipInterval: 60000,
    }
  },
} as { [key: string]: IConstants }

export default constants
