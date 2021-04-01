export interface IConstants {
  auth: {
    callbackURL: string,
    successRedirect: string,
    failureRedirect: string,
  },
  db: {
    logging?: boolean,
    synchronize?: boolean,
  },
  messaging: {
    waitFriendDelay: number,
    baseClientUrl: string,
    checkSvetoslavFriendshipInterval: number,
  },
  logger: {
    console:{
      shortSQL: boolean
    }
  }
}

const constants = {
  development: {
    auth: {
      callbackURL: 'http://localhost:8081/auth/vkontakte/callback',
      successRedirect: 'http://localhost:8080',
      failureRedirect: 'http://localhost:8080/thanks'
    },
    db: {
      "synchronize": false,
      "logging": true,
    },
    messaging: {
      waitFriendDelay: 15000,
      baseClientUrl: 'http://localhost:8080/',
      checkSvetoslavFriendshipInterval: 60000,
    },
    logger: {
      console: {
        shortSQL: true
      }
    }
  },
  test: {
    auth: {
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
    },
    logger: {
      console: {
        shortSQL: true
      }
    }
  },
  production: {
    auth: {
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
      checkSvetoslavFriendshipInterval: 15 * 60 * 1000,  //15 минут
    },
    logger: {
      console: {
        shortSQL: true
      }
    }
  },
} as { [key: string]: IConstants }

// console 'trigger ci/cd'

export default constants
