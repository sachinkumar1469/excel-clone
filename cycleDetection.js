function checkGraphCycle(graphComponentMatrix){
    console.log("cycle called");
    let visited = [];
    let dfsVisited = [];
    for(let i = 0; i<row;i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j =0;j<col;j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }
    
    for(let i=0;i<graphComponentMatrix.length;i++){
        for(let j=0;j<graphComponentMatrix[0].length;j++){
            let currNode = graphComponentMatrix[i][j];
            function toVisit(currNode){
                visited[i][j]=true;
                dfsVisited[i][j] = true;
                for(let k = 0; k<currNode.length;k++){
                    let currNodeDep = currNode[i];
                    let rowId = currNodeDep[0];
                    let colId = currNodeDep[1];
                    if(visited[rowId][colId]==false){
                        let response = toVisit(graphComponentMatrix[rowId][colId]);
                        if(response) return true;
                    }else if(visited[rowId][colId] == true && dfsVisited[rowId][colId]==true ){
                        return true;
                    }
                }
                return false;

            }
            if(visited[i][j]==false){
                let res = toVisit(currNode);
                if(res) return true;
            }
            // if(visited[i][j] == false){
            //     let response = dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsVisited);
            //     if(response) return true;
            // }
            
        }
    }
    return false;
}
function dfsCycleDetection(graphComponentMatrix,rowG,colG,visited,dfsVisited){
    visited[rowG][colG] = true;
    dfsVisited[rowG][colG] = true;

    for(let child = 0;child<graphComponentMatrix[rowG][colG].length;child++){
        let [rowIdC,colIdC] = graphComponentMatrix[rowG][colG][child];
        console.log(rowIdC,colIdC);
        if(visited[rowIdC][colIdC] == false){
            let respose = dfsCycleDetection(graphComponentMatrix,rowIdC,colIdC,visited,dfsVisited);
            if(respose == true) return true;
        } else if(visited[rowIdC][colIdC] == true && dfsVisited[rowIdC][colIdC]==true){
            return true;
        }
    }

    dfsVisited[rowG][colG] = false;
    return false;
}