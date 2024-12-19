function makeCanvasHD(canvas: HTMLCanvasElement, canvasWidth: number, canvasHeight: number) {
  const dpr = window.devicePixelRatio;

  // scale canvas to match device pixel ratio
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context cannot be created');
  }
  // reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // scale based on device pixel ratio to prevent blurry rendering
  ctx.scale(dpr, dpr);

  return { ctx }
}

export { makeCanvasHD }
