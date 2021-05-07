import { Unit } from "./types"
export const units = {
  zh: {
    millisecond: "毫秒",
    second: "秒",
    minute: "分",
    hour: "时",
    day: "天",
    month: "月",
    year: "年",
  },
  en: {
    millisecond: "ms",
    second: "s",
    minute: "m",
    hour: "h",
    day: "D",
    month: "M",
    year: "Y",
  },
} as const

const millisecond = 1
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const month = day * 30 // 统一按30天处理
const year = day * 365

export const map = {
  year,
  month,
  day,
  hour,
  minute,
  second,
  millisecond,
} as Record<Unit, number>
