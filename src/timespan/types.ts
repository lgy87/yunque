/*
 * Guangyao Li
 * 2021/05/06
 * lgy87@foxmail.com
 */
export type Timestamp = number
export type Unit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "month"
  | "year"
type Lang = "zh" | "en"
type LangOptions = Partial<Record<Unit, string>>
export type TimespanOptions = Partial<{
  delimiter: string
  lang: Lang
  langOptions: LangOptions
}>
