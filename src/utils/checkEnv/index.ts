const envs = [
  'NODE_ENV',

  'APP_PORT',

  'DB_HOST',
  'DB_DB',
  'DB_USER',
  'DB_PASSWORD',
  'DB_PORT',

  'VK_CLIENT_ID',
  'VK_SVETOSLAV_ID',
  'VK_TEST_USER',
]
if (process.env.NODE_ENV !== 'test') {
  envs.push(
    'VK_CLIENT_SECRET',
    'VK_SVETOSLAV_TOKEN'
  )
}

for (let eachEnv of envs) {
  if (!process.env[eachEnv]) {
    throw new Error(eachEnv + ' env not defined')
  }
}
