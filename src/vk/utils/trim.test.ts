import trim from "@/vk/utils/trim";


describe('trim', () => {
  it('multiline', async () => {
    const result = trim(`
    ййй
    ффф
    `)
    expect(result).toBe('ййй\nффф')
  })
})

