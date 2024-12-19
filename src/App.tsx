import React, { useMemo } from 'react';
import CustomMsaCanvas from './CustomMsaCanvas';
import CustomMsaManager from './CustomMsaManager';
import CustomMsaColumns from './CustomMsaColumns';
import SeqData from './SeqData';
import CustomMsaColumnsRV from './CustomMsaColumnsRV';
import CustomMsaNavigation from './CustomMsaNavigation';
const App: React.FC = () => {
  const headers = ['S.No', 'EntityId', 'Name'];

  const getColumn = useMemo(() => {
    return (columnIndex: number) => {
      return {
        columnKey: columnIndex,
        width: 90,
        flexGrow: 1,
        header: () => <div style={{ color: 'black' }}> {headers[columnIndex % 3]} </div>,
        cell: ({ rowIndex, columnIndex }: { rowIndex: number, columnIndex: number }) => {
          let text = rowIndex as unknown as string;
          if (columnIndex > 0) {
            const sequence = SeqData[rowIndex];
            text = sequence.name;
          }
          const cellStyles = {
            color: 'black',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            font: 'mono',
            fontSize: '11px',
            fontWeight: 'bold',
            //width: 90,
            height: 24,
          }
          return (
            <div style={{ ...cellStyles }}>
              {text}
            </div>
          )
        }
      }
    }
  }, [])
  const getSequences = (row: number) => {
    return SeqData[row];
  }
  const Cell = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
    let text = rowIndex as unknown as string;
    if (rowIndex === 0) {
      text = headers[columnIndex % 3];
    }
    else if (columnIndex > 0) {
      const sequence = SeqData[rowIndex - 1];
      text = sequence.name;
    }
    return (
      <div
        className={
          columnIndex % 2
            ? rowIndex % 2 === 0
              ? "GridItemOdd"
              : "GridItemEven"
            : rowIndex % 2
              ? "GridItemOdd"
              : "GridItemEven"
        }
        style={style}
      >
        {text}
      </div>
    )
  };

  const useFDT = 0;
  const columns = useFDT ? <CustomMsaColumns getColumns={getColumn} columnsCount={4} width={400} /> :
    <CustomMsaColumnsRV Cell={Cell} columnsCount={4} width={400} />;
  
  return (
    <CustomMsaManager rowsCount={1000}>
      {columns}
      <div style={{ position: "relative", top: "-50px" }}>
        <CustomMsaNavigation min={0} max={300} step={20} width={690} />
        <CustomMsaCanvas
          height={500}
          width={690}
          getSequences={getSequences} />
      </div>


    </CustomMsaManager>
  );
};

export default App;