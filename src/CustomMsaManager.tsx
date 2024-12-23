import React, { useMemo, useState } from 'react';
import { ScrollContext } from './ScrollContext';
import { RecoilRoot } from 'recoil';


type Props = {
    children: React.ReactNode;
    rowsCount: number;
  }
  
const CustomMsaManager: React.FC<Props> = (props) => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const {children} = props;
  const {rowsCount} = props;
  const value = useMemo(
    () => ( {scrollY, setScrollY, rowsCount, scrollX, setScrollX}),
    [ scrollY, scrollX, rowsCount]
  );
  return (
    <RecoilRoot>
      <ScrollContext.Provider value={value}>
        <div style={{display: 'flex'}}>
          {children}
        </div>
      </ScrollContext.Provider>
    </RecoilRoot>

  );
};

export default CustomMsaManager;