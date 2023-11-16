import { useState } from 'react';
import {astar} from './js/astar'
import {Graph} from './js/graph'

const ROWS = 20;
const COLS = 20;

const initialGrid = Array.from({ length: ROWS }, () =>
  Array.from({ length: COLS }, () => 1)
);

const App = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [end, setEnd] = useState({ row: ROWS - 1, col: COLS - 1 });
  const [pathCoordinates, setPathCoordinates] = useState([]);

  const [isStartChecked, setStartChecked] = useState(false);
  const [isEndChecked, setEndChecked] = useState(false);

  const [execTime, setExecTime] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

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

      newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
      setGrid(newGrid);
  };

  const visualizePath = () => {
    var graph = new Graph(grid);
    var startG = graph.grid[start.row][start.col];
    var endG = graph.grid[end.row][end.col];

    const tB = Date.now();
    var result = astar.search(graph, startG, endG).slice(0, -1);
    const tE = Date.now();  
    if (result.length !== 0){
      setExecTime(tE - tB);
      setIsCalculated(true);
      setPathCoordinates(result);
    }
    else{
      alert("Not reachable!")
    }
  };

  const resetField = () => {
    const newGrid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => 1))
    setGrid(newGrid);
    setPathCoordinates([])
    setIsCalculated(false)
  }

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
      <button onClick={resetField}>Reset field</button>
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
                background: pathCoordinates.some((node) => (node.x === rowIndex) && (node.y === colIndex)) 
                ? 
                'red' : cell === 0 ? 
                'black' : cell === 1 ? 
                'white' : ''
              }}
            >
              {start.row === rowIndex && start.col === colIndex && 'S'}
              {end.row === rowIndex && end.col === colIndex && 'E'}
            </div>
          ))
        )}
      </div>
      <h2>{ isCalculated && execTime} ms</h2>
    </div>
  );
};

export default App;
