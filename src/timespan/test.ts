/*
 * Guangyao Li
 * 2021/05/06
 * lgy87@foxmail.com
 */
import { map } from "./configs"
import timespan from "./index"

test("如果不是时间戳格式, 应该throw 错误", () => {
  expect(() => timespan("not-a-timestamp" as any)).toThrow()
})

test("允许指定数字和单位之间的分隔符", () => {
  const _30s = 30 * map.second
  expect(timespan(_30s)).toBe("30s")
  expect(timespan(_30s, { delimiter: " " })).toBe("30s")
})

test("可以正常解析时间戳(秒级以下)", () => {
  const _999ms = 999
  expect(timespan(_999ms)).toBe("999ms")
  expect(timespan(_999ms, { lang: "zh" })).toBe("999毫秒")
})

test("可以正常解析时间戳(分钟级以下)", () => {
  const _59s = 59 * map.second
  expect(timespan(_59s)).toBe("59s")
})

test("可以正常解析时间戳(混合)", () => {
  const timestamp = 23 * 50 * map.second
  expect(timespan(timestamp)).toBe("19m10s")
})

test("可以正常解析时间戳(混合, 跳过中间一些值)", () => {
  const timestamp = 5 * map.day + 10 * map.second
  expect(timespan(timestamp)).toBe("5D10s")
})

test("正常解析 (全)", () => {
  const timestamp =
    1 * map.year +
    2 * map.month +
    3 * map.day +
    4 * map.hour +
    5 * map.minute +
    6 * map.second

  expect(timespan(timestamp)).toBe("1Y2M3D4h5m6s")
  expect(timespan(timestamp, { delimiter: " " })).toBe("1Y 2M 3D 4h 5m 6s")
})

test("可以预先自定义配置", () => {
  const timespanZH = timespan.config({
    delimiter: "/",
    lang: "zh",
    langOptions: {
      hour: "小时",
    },
  })

  const timespanEN = timespan.config({
    delimiter: " ",
    lang: "en",
    langOptions: {
      minute: "minute",
    },
  })

  const timestamp =
    1 * map.year +
    2 * map.month +
    3 * map.day +
    4 * map.hour +
    5 * map.minute +
    6 * map.second

  expect(timespanZH(timestamp)).toBe("1年/2月/3天/4小时/5分/6秒")
  expect(timespanEN(timestamp)).toBe("1Y 2M 3D 4h 5minute 6s")
})
