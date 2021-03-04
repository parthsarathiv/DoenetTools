import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const inputcounter = atom({
    key: 'inputcounter',
    default: 0,
});