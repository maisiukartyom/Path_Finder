import { useEffect, useState } from 'react';
import {astar} from '../../js/astar'
import {Graph} from '../../js/graph'
import './grid.css'
import Cell from '../Cell/Cell';
import { Stack, Button, Checkbox, MenuItem, FormControl, Select, InputLabel} from '@mui/material';


const Grid = () => {
  const [gridSize, setGridSize] = useState(100)

  const initialGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 1)
  );

  const [grid, setGrid] = useState(initialGrid);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [end, setEnd] = useState({ row: gridSize - 1, col: gridSize - 1 });
  const [pathCoordinates, setPathCoordinates] = useState([]);

  const [isStartChecked, setStartChecked] = useState(false);
  const [isEndChecked, setEndChecked] = useState(false);

  const [execTime, setExecTime] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);


  const handleCellClick = (row, col) => {
      const newGrid = [...grid];

      if (isStartChecked) {
        if (setPathCoordinates.length !== 0){
          setPathCoordinates([])
        }
        setStart({ row, col });
        setGrid(newGrid);
        return;
      }

      if (isEndChecked) {
        if (setPathCoordinates.length !== 0){
          setPathCoordinates([])
        }
        setEnd({ row, col });
        setGrid(newGrid);
        return;
      }

      if (setPathCoordinates.length !== 0){
        setPathCoordinates([])
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
    const newGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 1));
    
    setStartChecked(false);
    setEndChecked(false);
    setStart({ row: 0, col: 0 });
    setEnd({ row: gridSize - 1, col: gridSize - 1 });
    setGrid(newGrid);
    setPathCoordinates([]);
    setIsCalculated(false);
  }

  useEffect(() => {
    resetField()
  }, [gridSize])

  return (
    <div>
      <div>
        <label>
          Start
          <Checkbox size='small' checked={isStartChecked} disabled={isEndChecked} onChange={() => setStartChecked(!isStartChecked)} />
        </label>
        <label>
          End
          <Checkbox size='small' checked={isEndChecked} disabled={isStartChecked} onChange={() => setEndChecked(!isEndChecked)} />
        </label>
        <FormControl size='small'>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gridSize}
          label="Size"
          onChange={(e) => setGridSize(e.target.value)}
        >
          <MenuItem value={20}>20X20</MenuItem>
          <MenuItem value={50}>50X50</MenuItem>
          <MenuItem value={100}>100X100</MenuItem>
        </Select>
      </FormControl>
      </div>
      <Stack spacing={2} direction="row" marginTop="15px">
        <Button size='small' variant='contained' onClick={visualizePath}>Visualize Path</Button>
        <Button size='small' variant='contained' onClick={resetField}>Reset field</Button>
      </Stack>
      <label className='execTime'>{ isCalculated && `${execTime} ms` }</label>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 18px)`, marginTop: '15px' }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell 
                key={`${rowIndex}-${colIndex}`}
                info = {{pathCoordinates, rowIndex, colIndex, start, end, cell, handleCellClick}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
