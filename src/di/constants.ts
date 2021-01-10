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
    }
  },
  production: {
    auth:{
      callbackURL: 'https://staging.kopnik.org/auth/vkontakte/callback',
      successRedirect: 'https://staging.kopnik.org',
      failureRedirect: 'https://staging.kopnik.org'
    },
    db: {
      "synchronize": false,
      "logging": true,
    },
    messaging: {
      waitFriendDelay: 60000,
      baseClientUrl: 'https://staging.kopnik.org/',
    }
  },
} as { [key: string]: IConstants }

export default constants
