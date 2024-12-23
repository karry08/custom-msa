import React, { useEffect, useRef, useContext } from 'react';
import { seqCount, seqMaxLength } from './SeqData';
import { SEQ_BLOCK_HEIGHT } from './constants';
import CanvasCached from './CanvasCached';
import { ScrollContext } from './ScrollContext';
import Ruler from './Ruler';
import { useRecoilState } from 'recoil';
import { maxSeqLengthState, residueWidthState, scrollXR, scrollYR } from './atoms/Atoms';

const CustomMsaCanvas: React.FC<any> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height, width, getSequences, rowsCount, userecoil} = props;
  let scrollY, setScrollY,scrollX, setScrollX;
    if (userecoil) {
      [scrollY, setScrollY] = useRecoilState(scrollYR);
      [scrollX, setScrollX] = useRecoilState(scrollXR);

    }
    else {
      const scrollContext = useContext(ScrollContext);
  
    if (!scrollContext) {
      throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
    }
  
      scrollY= scrollContext.scrollY;
      setScrollY = scrollContext.setScrollY
      scrollX = scrollContext.scrollX
      setScrollX = scrollContext.setScrollX

    }
//   const scrollContext = useContext(ScrollContext);
//   if (!scrollContext) {
//     throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
//   }
//  const {  scrollY, setScrollY, scrollX, setScrollX } = scrollContext;

 useEffect(() => {
    const id = setInterval(() => {
     // setScrollX(scrollX + 1);
      //setScrollY(scrollY + 1);
      // // shake test
      // setScrollX(Math.max(0, scrollX + (Math.random() * 4 * 2) - 4));
       //setScrollY(Math.max(0, scrollY + (Math.random() * 4 * 2) - 4));
    }, 0);
    return () => clearInterval(id);
  }, [scrollX, scrollY, setScrollX, setScrollY])
  const [residueWidth, setResidueWidth] = useRecoilState(residueWidthState);
  const [maxSeqLength, setMaxSeqLength] = useRecoilState(maxSeqLengthState)
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {

        // Zoom functionality
        event.preventDefault(); // Prevent browser zoom
        const zoomFactor = 1.05; // Zoom sensitivity
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
        newScrollX = Math.min(maxSeqLength * residueWidth - width, newScrollX);
        newScrollY = Math.min(seqCount * SEQ_BLOCK_HEIGHT - height, newScrollY);
        setScrollX(newScrollX);
        setScrollY(newScrollY);}
    }
    
    const container = containerRef.current!;
    container.addEventListener('wheel', handleScroll, { passive: true });

    return () =>  {
      container.removeEventListener('wheel', handleScroll, { passive: true } as AddEventListenerOptions);
    }
  }, [height, scrollX, scrollY, width, residueWidth])

  useEffect(() => {
    let maxSeqLength = 0;
    for (let i = 0; i < rowsCount; i++) {
      maxSeqLength = Math.max(maxSeqLength, getSequences(i).seq.length);
    }
    console.log(maxSeqLength, "max")
    setMaxSeqLength(maxSeqLength);
  },[getSequences, rowsCount])
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