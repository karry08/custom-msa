import { selector } from 'recoil';
import { ScrollContext } from '../ScrollContext';
import { useContext } from 'react';
import { residueWidthState } from '../atoms/Atoms';

export const contextDependentSelector = selector({
  key: 'contextDependentSelector',
  get: ({ get }) => {
    // Access the context value via a helper
    const contextValue = getContextValue();
    const residueWidthValue = get(residueWidthState);
    console.log('contextValue', contextValue, residueWidthValue);
    return `Recoil + ${residueWidthValue}`;
  },
});

// Helper to read the context
export const getContextValue = () => {
  const contextValue = useContext(ScrollContext);
  if (!contextValue) {
    throw new Error('getContextValue must be used within a MyContextProvider');
  }
  return contextValue;
};
