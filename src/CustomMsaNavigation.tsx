import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollContext } from './ScrollContext';
import { useRecoilState } from "recoil";
import { maxSeqLengthState, residueWidthState, scrollXR } from "./atoms/Atoms";

interface CustomMsaNavigationProps {
    step?: number;
    width: number;
    userecoil: number
}

const CustomMsaNavigation: React.FC<CustomMsaNavigationProps> = ({
  step = 20,
  width,
  userecoil
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const min = 0;
  // const scrollContext = useContext(ScrollContext);
  
  // if (!scrollContext) {
  //   throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
  // }
  // const { scrollX, setScrollX } = scrollContext;
  const [residueWidth, setResidueWidth] = useRecoilState(residueWidthState);
  const [maxSeqLength, _setMaxSeqLength] = useRecoilState(maxSeqLengthState);
    let scrollX, setScrollX;
      if (userecoil) {
        [scrollX, setScrollX] = useRecoilState(scrollXR);
  
      }
      else {
        const scrollContext = useContext(ScrollContext);
    
      if (!scrollContext) {
        throw new Error('CustomMsaCanvas must be used within a CustomMsaManager');
      }
    
        scrollX = scrollContext.scrollX
        setScrollX = scrollContext.setScrollX
  
      }
  const steps = [];
  for (let i = min; i <= maxSeqLength; i += step) {
    steps.push(i);
  }

  const [start, setStart] = useState(scrollX / residueWidth);
  const [end, setEnd] = useState(maxSeqLength);
  useEffect(() => {
    setStart(scrollX / residueWidth);
    setEnd(scrollX / residueWidth + width / residueWidth);
  }, [scrollX, residueWidth]);
  const onChange = (start: number, end: number) => {
    const newResidueWidth = width / (end - start); // Calculate the new width per residue
    const newScrollX = start * newResidueWidth;   // Calculate the new scroll position based on start

    // Update state with calculated values
    setScrollX(newScrollX);
    setResidueWidth(newResidueWidth);
  }
  // setResidueWidth(end - start
  const handleDragStart = (
    e: React.MouseEvent,
    deltaHandler: (delta: number) => void
  ) => {
    e.preventDefault(); // Prevent text selection
    const container = containerRef.current;
    if (!container) return;

    const scaleRect = container.getBoundingClientRect();
    const scaleWidth = scaleRect.width;

    const startX = e.clientX;

    const handleMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaValue = (deltaX / scaleWidth) * (maxSeqLength - min);
      deltaHandler(deltaValue);
    };

    const stopMove = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopMove);
    };
    console.log(start, end)
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopMove);
  };

  const dragLeftEdge = (delta: number) => {
    const newStart = Math.max(min, Math.min(start + delta, end - step));
    setStart(newStart);
    onChange(newStart, end);
  };

  const dragRightEdge = (delta: number) => {
    const newEnd = Math.min(maxSeqLength, Math.max(end + delta, start + step));
    setEnd(newEnd);
    onChange(start, newEnd);
  };

  const dragInnerArea = (delta: number) => {
    const range = end - start;
    let newStart = start + delta;
    let newEnd = end + delta;

    if (newStart < min) {
      newStart = min;
      newEnd = newStart + range;
    }

    if (newEnd > maxSeqLength) {
      newEnd = maxSeqLength;
      newStart = newEnd - range;
    }

    setStart(newStart);
    setEnd(newEnd);
    onChange(newStart, newEnd);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div
        ref={containerRef}
        style={{ position: "relative", width: "100%", height: "50px" }}
      >
        {/* Render scale ticks */}
        {steps.map((value) => (
          <div
            key={value}
            style={{
              position: "absolute",
              left: `${((value - min) / (maxSeqLength - min)) * 100}%`,
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <div style={{ height: "10px", width: "2px", backgroundColor: "black" }}></div>
            <span style={{ fontSize: "12px", marginTop: "5px", display: "block" }}>{value}</span>
          </div>
        ))}

        {/* Left edge */}
        <div
          style={{
            position: "absolute",
            left: `${((start - min) / (maxSeqLength - min)) * 100}%`,
            transform: "translateX(-50%)",
            cursor: "ew-resize",
            height: "20px",
            width: "10px",
            backgroundColor: "blue",
          }}
          onMouseDown={(e) => handleDragStart(e, dragLeftEdge)}
        ></div>

        {/* Right edge */}
        <div
          style={{
            position: "absolute",
            left: `${((end - min) / (maxSeqLength - min)) * 100}%`,
            transform: "translateX(-50%)",
            cursor: "ew-resize",
            height: "20px",
            width: "10px",
            backgroundColor: "red",
          }}
          onMouseDown={(e) => handleDragStart(e, dragRightEdge)}
        ></div>

        {/* Draggable inner area */}
        <div
          style={{
            position: "absolute",
            left: `${((start - min) / (maxSeqLength - min)) * 100}%`,
            width: `${((end - start) / (maxSeqLength - min)) * 100}%`,
            height: "20px",
            backgroundColor: "rgba(0, 128, 0, 0.3)",
            cursor: "grab",
          }}
          onMouseDown={(e) => handleDragStart(e, dragInnerArea)}
        ></div>
      </div>
    </div>
  );
};

export default CustomMsaNavigation;
