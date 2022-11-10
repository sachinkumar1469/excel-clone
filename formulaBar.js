// Event listener to update the value when user blur on the cell
document.querySelectorAll('.cell').forEach((cell)=>{
    cell.addEventListener('blur',(e)=>{
        let currCell = e.target;
        let currCellDb = returnStorageObjOfCellByUsingAddress(currCell.getAttribute('id'));
        let oldValue = currCellDb['value'];
        currCellDb['value']=e.target.value;
        if(!(oldValue == currCellDb['value'])){
            // console.log('yes');
            currCellDb['formula']=e.target.value;
        }
        updateCellInUi(e.target);
    })
});


function addChildToGraphComponent(formula,childAddress){
    let [crid,ccid] = getRidAndCid(childAddress);
    let formulaArr = formula.split(' ');
    for(let i = 0; i<formulaArr.length;i++){
        let ascciValue = formulaArr[i].charCodeAt(0);
        if(ascciValue>=60 && ascciValue<=90){
            let parent = formulaArr[i];
            let [prid,pcid] = getRidAndCid(parent);
            graphComponentMatrix[prid][pcid].push(getRidAndCid(childAddress));
            // console.log(graphComponentMatrix[prid][pcid],prid,pcid,'is parent of ',getRidAndCid(childAddress));
        }
    }
}

function removeChildFromGraphComponent(exp,childAddress){
    // console.log('remove child called');
    if(exp == "" || exp == undefined){
        return;
    }
    let expArr = exp.split(' ');
    // let [crid, ccid] = getRidAndCid(childAddress);
    let chidArray = getRidAndCid(childAddress);
    for(let i = 0; i<expArr.length;i++){
        let ascciValue = expArr[i].charCodeAt(0);
        if(ascciValue >= 65 && ascciValue <=90){
            let parent = expArr[i];
            let [prid,pcid] = getRidAndCid(parent);
            let index;
            for(let i = 0; i<graphComponentMatrix[prid][pcid].length;i++){
                let childStored = graphComponentMatrix[prid][pcid][i];
                if(childStored[0]==chidArray[0] && childStored[1]==chidArray[1]){
                    index = i;
                }
            }
            // console.log(index);
            // console.log(graphComponentMatrix[prid][pcid].length);
            let sliced = graphComponentMatrix[prid][pcid].splice(index,1);
            // console.log(sliced,'SLICED');
            // console.log(graphComponentMatrix[prid][pcid].length);
        }
    }
}

function getRidAndCid(address){
    let cell = cellDiv(address);
    let cid = cell.getAttribute('cid');
    let rid = cell.getAttribute('rid');
    return [JSON.parse(rid),JSON.parse(cid)];
}
// let [ccid,rrid] = getRidAndCid('B3')
// console.log(ccid,rrid);



// Event listener for the formula bar
$functionBar.addEventListener('keyup',(e)=>{
    if(e.key == "Enter"){

        let currCell = currentSelectedCellAddress();
        let cellDb = returnStorageObjOfCellByUsingAddress(currCell);
        let oldFormula = cellDb['formula'];
        cellDb['formula'] = e.target.value;
        cellDb['value'] = evaluateExpression(e.target.value,oldFormula,currCell);
        updateCellInUi(cellDiv(currCell));
    }
});

