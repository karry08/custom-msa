import { SEQ_GAP_BACKGROUND } from "./constants";

type ColorScheme = Record<string, [number, number, number]>;
const Taylor = {
  "D": [255, 0, 0],
  "S": [255, 51, 0],
  "T": [255, 102, 0],
  "G": [255, 153, 0],
  "P": [255, 204, 0],
  "C": [255, 255, 0],
  "A": [204, 255, 0],
  "V": [153, 255, 0],
  "I": [102, 255, 0],
  "L": [51, 255, 0],
  "M": [0, 255, 0],
  "F": [0, 255, 102],
  "Y": [0, 255, 204],
  "W": [0, 204, 255],
  "H": [0, 102, 255],
  "R": [0, 0, 255],
  "K": [102, 0, 255],
  "N": [204, 0, 255],
  "Q": [255, 0, 204],
  "E": [255, 0, 102],
} as ColorScheme;

const getColorByChar = (scheme: ColorScheme, c: string) => {
  const colorArray = scheme[c] || SEQ_GAP_BACKGROUND;
  const colorAsHex = colorArray.map((c) => c.toString(16).padStart(2, '0')).join('');
  return '#' + colorAsHex;
}

export { Taylor, getColorByChar };
