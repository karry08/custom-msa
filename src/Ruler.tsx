import React from "react";
type Props = {
  canvasWidth: number;
  height: number;
  residueWidth: number;
  scrollX: number;
}

function Ruler(props: Props) {
  const {  canvasWidth, height, residueWidth, scrollX } = props;
  const firstX = Math.floor(scrollX / residueWidth);
  const lastX = Math.floor((scrollX + canvasWidth) / residueWidth);
  return (
    <div style={{ backgroundColor: "white", display: "flex", width: `${canvasWidth}px`, overflow: "hidden", height:  `${height}px`, color: "black", justifyContent: "space-between"}}>
      <div>{firstX}</div> <div>{lastX}</div>
    </div>
  );
}

export default React.memo(Ruler)
