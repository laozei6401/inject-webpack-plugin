export interface optionConfig {
  name: string
  position: "head" | "body"
}

type a = string | optionConfig

export interface Options {
  head: Array<a>
  body: Array<a>
}
