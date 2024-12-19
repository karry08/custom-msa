import React, { useMemo, useState } from 'react';
import { ScrollContext } from './ScrollContext';
import { SEQ_BLOCK_WIDTH } from './constants';


type Props = {
    children: React.ReactNode;
    rowsCount: number;
  }
  
const CustomMsaManager: React.FC<Props> = (props) => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [residueWidth, setResidueWidth] = React.useState(SEQ_BLOCK_WIDTH);

  const {children} = props;
  const {rowsCount} = props;
  const value = useMemo(
    () => ( {scrollY, setScrollY, rowsCount, scrollX, setScrollX, residueWidth, setResidueWidth}),
    [ scrollY, scrollX, rowsCount, residueWidth]
  );
  return (
    <ScrollContext.Provider value={value}>
      <div style={{display: 'flex'}}>
        {children}
      </div>
    </ScrollContext.Provider>

  );
};

export default CustomMsaManager;