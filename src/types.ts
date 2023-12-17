export type Time = Date | string | null
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type UseState<T> = [T, SetState<T>]
export type ItemView = {
  id: string
  text: string
  done: boolean
}
export type Scene = {
  id: string
  text: string
  items: ItemView[]
}
export type NowStylePattern = "style1" | "style2"
