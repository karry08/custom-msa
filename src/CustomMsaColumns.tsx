window.global = globalThis;
import React, { useContext } from 'react';
import {Table} from 'fixed-data-table-2'
import { ScrollContext } from './ScrollContext';
import 'fixed-data-table-2/dist/fixed-data-table.css';

const CustomMsaColumns: React.FC<any> = (props) => {
  const {getColumns, columnsCount, width, } = props;
  const scrollContext = useContext(ScrollContext);
  if (!scrollContext) {
    throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
  }
  const { scrollY,  setScrollY, rowsCount } = scrollContext;
  const onVerticalScroll = (newScrollY: number) => {
    setScrollY(newScrollY);
  }
  return (
    <Table
      rowHeight={24}
      headerHeight={30}
      columnsCount={columnsCount}
      scrollTop={scrollY}
      onVerticalScroll={onVerticalScroll}
      height={500 + 30}
      width={width}
      getColumn={getColumns}
      columnWidth={50}
      rowsCount={rowsCount}
    >

    </Table>
  );
};
    

export default React.memo(CustomMsaColumns);
