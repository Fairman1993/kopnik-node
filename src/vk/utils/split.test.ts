import split from "@/vk/utils/split";


describe('split', () => {
  it('singleline', async () => {
    const result = split(`qqq`)
    expect(result).toStrictEqual(['qqq'])
  })

  it('trim', async () => {
    const result = split(`
    ййй
    ффф
    `)
    expect(result).toStrictEqual(['ййй\nффф'])
  })

  it('paragraph', async () => {
    const result = split(`
    ййй
    
    яяя
    `)
    expect(result).toStrictEqual(['ййй\n\nяяя'])
  })

  it('split', async () => {
    const result = split(`
    ййй
    
    
    ццц
    `)
    expect(result).toStrictEqual(['ййй', 'ццц'])
  })
})

