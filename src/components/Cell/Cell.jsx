import './cell.css'


const Cell = ({info}) => {

    const extraClassname = 
        info.pathCoordinates.some((node) => (node.x === info.rowIndex) && (node.y === info.colIndex)) 
        ? 
        'cell-path' : info.cell === 0 ? 
        'cell-wall' : '';

    return(
        <div
            className={`cell ${extraClassname}`}
            onClick={() => info.handleCellClick(info.rowIndex, info.colIndex)}
        >
            {info.start.row === info.rowIndex && info.start.col === info.colIndex && (
                <span className="marker">S</span>
            )}
            {info.end.row === info.rowIndex && info.end.col === info.colIndex && (
                <span className="marker">E</span>
            )}
        </div>
    )
}

export default Cell