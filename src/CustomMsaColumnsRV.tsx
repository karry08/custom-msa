import React, { useContext } from 'react';
import { ScrollContext } from './ScrollContext';
import { MultiGrid } from "react-virtualized";

const CustomMsaColumnsRV: React.FC<any> = (props) => {
  const { Cell, columnsCount, width, } = props;
  const scrollContext = useContext(ScrollContext);
  if (!scrollContext) {
    throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
  }
  const { scrollY, setScrollY, rowsCount } = scrollContext;
  const onVerticalScroll = (scrollValues) => {
    const { scrollTop: newScrollY } = scrollValues;
    setScrollY(newScrollY);
  }
  return (
    <MultiGrid
      className="Grid"
      cellRenderer={Cell}
      columnCount={columnsCount}
      columnWidth={90}
      height={524}
      overscanColumnCount={1}
      overscanRowCount={1}
      rowCount={rowsCount + 1}
      rowHeight={24}
      width={width}
      scrollTop={scrollY}
      onScroll={onVerticalScroll}
    />
  )

};


export default React.memo(CustomMsaColumnsRV);
