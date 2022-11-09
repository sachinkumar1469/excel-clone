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

