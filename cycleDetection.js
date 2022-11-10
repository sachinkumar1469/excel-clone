let graphComponentMatrix = [];

for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j < col; j++) {
        // Why array -> More than 1 child relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}