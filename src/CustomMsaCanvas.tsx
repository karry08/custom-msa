import React, { useEffect, useRef, useContext } from 'react';
import { seqCount, seqMaxLength } from './SeqData';
import { SEQ_BLOCK_HEIGHT } from './constants';
import CanvasCached from './CanvasCached';
import { ScrollContext } from './ScrollContext';
import Ruler from './Ruler';

const CustomMsaCanvas: React.FC<any> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height, width, getSequences} = props;
  const scrollContext = useContext(ScrollContext);
  if (!scrollContext) {
    throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
  }
  const {  scrollY, setScrollY, rowsCount, scrollX, setScrollX, residueWidth, setResidueWidth } = scrollContext;
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {

        // Zoom functionality
        event.preventDefault(); // Prevent browser zoom
        const zoomFactor = 1.1; // Zoom sensitivity
        const delta = event.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
        const newResidueWidth = Math.max(
          3,
          Math.min(200, residueWidth * delta) // Clamp residue width
        );
        setResidueWidth(newResidueWidth);
        // return;
      } 
      else {

            
        let newScrollX = scrollX + event.deltaX;
        let newScrollY = scrollY + event.deltaY;
        newScrollX = Math.max(0, newScrollX);
        newScrollY = Math.max(0, newScrollY);
        newScrollX = Math.min(seqMaxLength * residueWidth - width, newScrollX);
        newScrollY = Math.min(seqCount * SEQ_BLOCK_HEIGHT - height, newScrollY);
        setScrollX(newScrollX);
        setScrollY(newScrollY);}
    }
    
    const container = containerRef.current!;
    container.addEventListener('wheel', handleScroll, { passive: true });

    return () =>  {
      container.removeEventListener('wheel', handleScroll, { passive: true });
    }
  }, [height, scrollX, scrollY, width, residueWidth])
  return (
    <div id={'root'} ref={containerRef}>
      <Ruler canvasWidth={width} scrollX={scrollX} residueWidth={residueWidth}  height={24} ></Ruler>
      <CanvasCached
        scrollX={scrollX}
        scrollY={scrollY}
        canvasHeight={height}
        canvasWidth={width}
        getSequences={getSequences} 
        rowsCount={rowsCount}
        residueWidth={residueWidth}
      />
    </div>
  );
};

export default CustomMsaCanvas;