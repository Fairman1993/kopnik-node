import container from "@/di/container"

describe('ip-api', () => {
  let ipApi

  beforeEach(async () => {
    // process.env.NODE_ENV = 'development'
    ipApi= container.ipApi
  })

  it('', async () => {
    const result = await ipApi('217.114.191.210')
    expect(result).toHaveProperty('country', 'Russia')
  })
})

