import { map, units } from "./configs"
import { TimespanOptions, Timestamp, Unit } from "./types"

const DEFAULT_OPTIONS = {
  delimiter: "",
  lang: "en" as const,
}

const entries = Object.entries(map) as Array<[Unit, number]>

export default function timespan(
  timestamp: Timestamp,
  options: TimespanOptions = DEFAULT_OPTIONS,
) {
  if (typeof timestamp !== "number") throw "Wrong Type!"

  const { lang, delimiter, langOptions } = Object.assign(
    {},
    DEFAULT_OPTIONS,
    options,
  )

  const unitMappingTable = Object.assign({}, units[lang], langOptions)
  if (timestamp < map.second) return timestamp + unitMappingTable.millisecond

  const result = [] as Array<[Unit, number]>

  for (const [unit, value] of entries) {
    const rest = Math.floor(timestamp / value)
    timestamp = timestamp % value

    if (rest <= 0) continue
    result.push([unit, rest])
    if (timestamp <= 0) break
  }

  return result
    .map(([unit, value]) => {
      const theUnit = unitMappingTable[unit]
      return [value, theUnit].join("")
    })
    .join(delimiter)
}

timespan.config = (config: TimespanOptions) => {
  return (timestamp: Timestamp) => timespan(timestamp, config)
}
