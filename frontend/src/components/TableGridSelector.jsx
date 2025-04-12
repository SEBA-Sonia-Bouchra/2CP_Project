import React, { useState } from 'react';

const TableGridSelector = () => {
  const rows = 7;
  const cols = 12;
  const [hoveredRow, setHoveredRow] = useState(1);
  const [hoveredCol, setHoveredCol] = useState(1);

  return (
    <div className="flex flex-col items-start space-y-2 p-1 bg-white rounded-lg shadow-xl w-max">
      <div className="grid grid-cols-12 gap-1">
        {[...Array(rows)].map((_, rowIndex) =>
          [...Array(cols)].map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-4 h-4 border border-[#4F3726] ${
                rowIndex < hoveredRow && colIndex < hoveredCol
                  ? 'bg-[#4F3726]'
                  : 'bg-[#4F3726] bg-opacity-20'
              }`}
              onMouseEnter={() => {
                setHoveredRow(rowIndex + 1);
                setHoveredCol(colIndex + 1);
              }}
            />
          ))
        )}
      </div>
      <div className="text-sm text-black font-lg self-center">
        {hoveredRow} * {hoveredCol}
      </div>
    </div>
  );
};

export default TableGridSelector;
