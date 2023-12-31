import { format, parseISO } from "date-fns"
import { Time } from "../types"

export const TimeLabel: React.FC<{
  time: Time
}> = ({ time }) => {
  if (!time) {
    return <></>
  }

  const _format = (time: Time, formatStyle: string) => {
    if (!time) return ""
    if (typeof time === "string") time = parseISO(time)
    try {
      return format(time, formatStyle)
    } catch (error) {
      console.error("df.format error", error)
      return ""
    }
  }
  return (
    <>
      {time !== undefined && time !== null ? (
        <>
          <span className="hours-label text-2xl">{time && _format(time, "HH:mm")}</span>
        </>
      ) : (
        <span></span>
      )}
    </>
  )
}
