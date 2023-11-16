import { useEffect, useState } from 'react';

const ROWS = 20;
const COLS = 20;

const initialGrid = Array.from({ length: ROWS }, () =>
  Array.from({ length: COLS }, () => 0)
);

const App = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [end, setEnd] = useState({ row: ROWS - 1, col: COLS - 1 });

  const [isStartChecked, setStartChecked] = useState(false);
  const [isEndChecked, setEndChecked] = useState(false);

  const handleCellClick = (row, col) => {
      const newGrid = [...grid];

      if (isStartChecked) {
        setStart({ row, col });
        setGrid(newGrid);
        return;
      }

      if (isEndChecked) {
        setEnd({ row, col });
        setGrid(newGrid);
        return;
      }

      newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1;
      setGrid(newGrid);
  };

  useEffect(() => {
    console.log(grid)
    console.log(start)
    console.log(end)
  }, [grid, start, end])

  const visualizePath = () => {
    
  };

  return (
    <div>
      <div>
        <label>
          Start
          <input type="checkbox" disabled={isEndChecked} onChange={() => setStartChecked(!isStartChecked)} />
        </label>
      </div>
      <div>
        <label>
          End
          <input type="checkbox" disabled={isStartChecked} onChange={() => setEndChecked(!isEndChecked)} />
        </label>
      </div>
      <button onClick={visualizePath}>Visualize Path</button>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 20px)` }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: '20px',
                height: '20px',
                border: '1px solid #ccc',
                background: cell === 1 ? 'black' : cell === 0 ? 'white' : 'green',
              }}
            >
              {start.row === rowIndex && start.col === colIndex && 'S'}
              {end.row === rowIndex && end.col === colIndex && 'E'}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
