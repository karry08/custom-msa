import React, { createContext } from 'react';

// Create a Context
type ScrollContextType = {
  scrollX: number;
  scrollY: number;
  setScrollX: React.Dispatch<React.SetStateAction<number>>;
  setScrollY: React.Dispatch<React.SetStateAction<number>>;
  //residueWidth: number;
  //setResidueWidth: React.Dispatch<React.SetStateAction<number>>;
  rowsCount: number;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);
