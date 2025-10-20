export interface LinkItem {
  text: string
  url: string // 이동할 URL 주소
}

export interface LinkGroup {
  title: string
  links: LinkItem[]
}
