declare module 'badwords-ko' {
  interface FilterOptions {
    emptyList?: boolean
    placeHolder?: string
    regex?: RegExp
  }

  class Filter {
    constructor(options?: FilterOptions)

    addWords(...words: string[]): this
    removeWords(...words: string[]): this

    isProfane(word: string): boolean
    clean(text: string): string
  }

  export default Filter
}
