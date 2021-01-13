import split from "@/vk/utils/split";


describe('split', () => {
  it('singleline', async () => {
    const result = split(`qqq`,10)
    expect(result).toStrictEqual(['qqq'])
  })

  it('multiline', async () => {
    let q5 = 'q'.repeat(5)
    let a4 = 'a'.repeat(4)
    const result = split(`
    ${q5}
    ${a4}
    `,10)
    expect(result).toStrictEqual([`${q5}\n${a4}`])
  })

  it('multiline signs', async () => {
    let q5 = '$q q.'
    let a4 = 'a$@#'
    const result = split(`
    ${q5}
    ${a4}
    `,10)
    expect(result).toStrictEqual([`${q5}\n${a4}`])
  })

  it('multi paragraph', async () => {
    let q5 = 'qqqqq'
    let a5 = 'aaaaa'
    const result = split(`${q5}
    
    ${a5}`,10)
    expect(result).toStrictEqual([q5, a5])
  })

  it('multi paragraph with spaces', async () => {
    let q5 = 'qqqqq'
    let a5 = 'aaaaa'
    const result = split(`
    ${q5}
    
    \t
    ${a5}
    `,10)
    expect(result).toStrictEqual([q5, a5])
  })
})

