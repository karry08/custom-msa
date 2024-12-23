import React, { useContext, useEffect, useRef } from 'react';
import { ScrollContext } from './ScrollContext';
import { FixedSizeGrid as Grid } from 'react-window';
import { useRecoilState } from 'recoil';
import { scrollYR } from './atoms/Atoms';

const CustomMsaColumnsRW: React.FC<any> = (props) => {
  const { Cell, columnsCount, width, rowsCount, userecoil } = props;
  const gridRef = useRef(null);
  let scrollY, setScrollY;
  if (userecoil) {
    [scrollY, setScrollY] = useRecoilState(scrollYR);
  }
  else {
    const scrollContext = useContext(ScrollContext);

  if (!scrollContext) {
    throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
  }

    scrollY= scrollContext.scrollY;
    setScrollY = scrollContext.setScrollY
  }
  
   
  const onScroll = ({ scrollTop }: { scrollTop: number }) => {
    setScrollY(scrollTop); // Update the vertical scroll position in the context
  };
  //console.log(scrollY);
  useEffect(() => {
    if (gridRef.current) {
      // @ts-ignore
      gridRef.current.scrollTo({ scrollTop: scrollY }); // Update the scroll position
    }
  }, [scrollY]);

  return (
    <Grid
      ref={gridRef}
      columnCount={columnsCount} // Total number of columns
      columnWidth={90}           // Fixed width of each column
      height={524}               // Height of the visible grid area
      rowCount={rowsCount + 1}   // Total number of rows
      rowHeight={24}             // Fixed height of each row
      width={width}              // Width of the visible grid area
      initialScrollTop={scrollY} // Set the initial scroll position
      onScroll={({ scrollTop }) => onScroll({ scrollTop })} // Handle scrolling
    >
      {Cell}
    </Grid>
  );
};

export default React.memo(CustomMsaColumnsRW);