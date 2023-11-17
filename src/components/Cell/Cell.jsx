import './cell.css'


const Cell = ({info}) => {

    const extraClassname = 
        info.pathCoordinates.some((node) => (node.x === info.rowIndex) && (node.y === info.colIndex)) 
        ? 
        'cell-path' : info.cell === 0 ? 
        'cell-wall' : '';
    
    console.log(extraClassname, info.cell)

    return(
        <div
            className={`cell ${extraClassname}`}
            onClick={() => info.handleCellClick(info.rowIndex, info.colIndex)}
        >
            {info.start.row === info.rowIndex && info.start.col === info.colIndex && 'S'}
            {info.end.row === info.rowIndex && info.end.col === info.colIndex && 'E'}
        </div>
    )
}

export default Cell