import { astar } from './astar.js';

function Graph(gridIn, options) {
    options = options || {};
    this.nodes = [];
    this.grid = [];
    for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];
    
        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
            var node = new GridNode(x, y, row[y]);
            this.grid[x][y] = node;
            this.nodes.push(node);
        }
    }
    this.init();
}

Graph.prototype = {
    init: function () {
        this.dirtyNodes = [];
        for (var i = 0; i < this.nodes.length; i++) {
        astar.cleanNode(this.nodes[i]);
        }
    },
    cleanDirty: function () {
        for (var i = 0; i < this.dirtyNodes.length; i++) {
            astar.cleanNode(this.dirtyNodes[i]);
        }
        this.dirtyNodes = [];
    },
    markDirty: function (node) {
        this.dirtyNodes.push(node);
    },
    neighbors: function (node) {
        var ret = [];
        var x = node.x;
        var y = node.y;
        var grid = this.grid;
    
        // West
        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y]);
        }
    
        // East
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y]);
        }
    
        // South
        if (grid[x] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1]);
        }
    
        // North
        if (grid[x] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1]);
        }
    
        return ret;
    }
};

function GridNode(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;
}

GridNode.prototype = {
    getCost: function (fromNeighbor) {
        return this.weight;
    },
    isWall: function () {
        return this.weight === 0;
    },
};

export { Graph};
