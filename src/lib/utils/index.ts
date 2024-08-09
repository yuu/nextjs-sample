// import { Result, Ok, Err } from 'ts-results'

// export * from './color'
// export * from './toHoursAndMinutes'
// export * from './query'
export * from './sort'

// export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))
//
// export const range = (from: number, to: number) => [...Array(to - from)].map((_, i) => from + i)
//
// export const tryParse = <R, F extends () => R = () => R>(func: F): Result<R, string> => {
//   try {
//     return Ok(func())
//   } catch (err) {
//     return Err((err as Error).message)
//   }
// }
//
// export const currencyFormater = new Intl.NumberFormat('ja-JP', {
//   style: 'currency',
//   currency: 'JPY'
// })
