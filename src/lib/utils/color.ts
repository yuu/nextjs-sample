import { Option, Some, None } from 'ts-results'

type RGB = [number, number, number]

const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

const hexToDec = (hex: string) => parseInt(hex, 16)

const toDigit6IfHex = (v: string) => {
  if (v == '#') {
    return v
  }

  return v + v
}

export const fullHex = (digit: string) => digit.split('').map(toDigit6IfHex).join('')

export const hexToRGB = (hexColor: string): Option<RGB> => {
  const result = HEX_REGEX.exec(hexColor)
  if (result === null) {
    return None
  }

  const r = hexToDec(result[1])
  const g = hexToDec(result[2])
  const b = hexToDec(result[3])

  return Some([r, g, b] as RGB)
}

export const halfHexToRGB = (halfHexColor: string): Option<RGB> => {
  return hexToRGB(fullHex(halfHexColor))
}

export const rgbToCSSStr = (color: RGB): Option<string> => {
  return Some(color.reduce((c, acc) => `${acc} ${c}`, ''))
}
