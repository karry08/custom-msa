import { useEffect, useRef } from "react"
import { seqCount } from './SeqData'
import { SEQ_BLOCK_HEIGHT } from "./constants"
import { getColorByChar, Taylor } from "./ColorScheme"
import { makeCanvasHD } from "./canvasUtil"

type Props = {
  scrollX: number;
  scrollY: number;
  canvasWidth: number;
  canvasHeight: number;
  getSequences: (row: number) => any;
  rowsCount: number;
  residueWidth: number;
}

function CanvasCached(props: Props) {
  const { scrollX, scrollY, canvasHeight, canvasWidth, getSequences, rowsCount, residueWidth } = props;
  const debugFPS = useRef(0);
  const cache = useRef({} as Record<string, CanvasRenderingContext2D>);
  useEffect(() => {
    const id = setInterval(() => {
      console.log("FPS", debugFPS.current);
      debugFPS.current = 0;
    }, 1000);
    return () => clearInterval(id);
  }, [])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  
  useEffect(() => {
    let debugBlocksCount = 0;

    const { ctx } = makeCanvasHD(canvasRef.current!, canvasWidth, canvasHeight);

    // draw canvas background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvasWidth, canvasWidth);

    const firstY = Math.floor(scrollY / SEQ_BLOCK_HEIGHT);
    const firstX = Math.floor(scrollX / residueWidth);
    
    for (let y = firstY; y < firstY+40; y++) {
      //const sequence = SeqData[y];
      const yStart = y * SEQ_BLOCK_HEIGHT - scrollY;
      const yEnd = (y+1) * SEQ_BLOCK_HEIGHT - scrollY;

      if (yStart >= canvasHeight) {
        break;
      }
      const seq = getSequences(y).seq;

      for (let x = firstX; x < seq.length; x++) {
        const xStart = x * residueWidth - scrollX;
        const xEnd = (x+1) * residueWidth - scrollX;

        if (xStart >= canvasWidth) {
          break;
        }
        const char = seq[x];
        //const char = 'A';
        const backgroundColor = getColorByChar(Taylor, char);
        // console.log("Filling character", char, "at", x, y, "with color", backgroundColor);
        const cacheKey = `${char}-${backgroundColor}-${residueWidth}-${SEQ_BLOCK_HEIGHT}`;
        if (!cache.current[cacheKey]) {
          const cachedCanvas = document.createElement("canvas");
          const { ctx: cachedCtx } = makeCanvasHD(cachedCanvas, residueWidth, SEQ_BLOCK_HEIGHT);
          cache.current[cacheKey] = cachedCtx;

          // draw background
          cachedCtx.fillStyle = backgroundColor;
          cachedCtx.fillRect(0, 0, residueWidth, SEQ_BLOCK_HEIGHT); 

          // draw text
          cachedCtx.fillStyle = "black";
          cachedCtx.font = 'bold 11px mono';
          cachedCtx.textBaseline = 'middle';
          cachedCtx.textAlign = "center";

          cachedCtx.fillText(
            char,
            residueWidth/2,
            SEQ_BLOCK_HEIGHT/2,
          );
        }
        ctx.drawImage(
          cache.current[cacheKey].canvas, 
          Math.floor(xStart), 
          Math.floor(yStart),
          residueWidth, 
          SEQ_BLOCK_HEIGHT
        );

        //draw vertical border
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xStart, yEnd);
        ctx.stroke();

        // draw horizontal border
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yStart);
        ctx.stroke();

        if (y === seqCount - 1) {
          //draw last vertical border
          ctx.beginPath();
          ctx.moveTo(xEnd, yStart);
          ctx.lineTo(xEnd, yEnd);
          ctx.stroke();

          // draw last horizontal border
          ctx.beginPath();
          ctx.moveTo(xStart, yEnd);
          ctx.lineTo(xEnd, yEnd);
          ctx.stroke();
        }

        debugBlocksCount++;
      }
    }
    debugFPS.current++;
  }, [canvasHeight, canvasWidth, scrollX, scrollY, residueWidth, getSequences, rowsCount])

  return (
    <canvas ref={canvasRef} />
  )
}

export default CanvasCached
