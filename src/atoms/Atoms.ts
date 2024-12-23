import { atom } from 'recoil';
import { SEQ_BLOCK_WIDTH } from '../constants';

export const residueWidthState = atom({
  key: 'residueWidthState', // Unique ID for this atom
  default: SEQ_BLOCK_WIDTH,          // Default value
});

export const scrollXR = atom({
  key: 'scrollXR',
  default: 0,
});

export const scrollYR = atom({
  key: 'scrollYR',
  default: 0,
});

export const maxSeqLengthState = atom({
  key: 'maxSeqLengthState',
  default: 0,
});