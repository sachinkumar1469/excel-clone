// $functionBar  currCellSelected

// console.log(currCellSelected.getAttribute('cid'),currCellSelected.getAttribute('rid'));
// console.log(document.querySelector(`.cell[rid='1'][cid='1']`));


// To add event listener for blur on each cell
for(let i = 0; i<row;i++){
    for(let j = 0;j<col;j++){
        let $eachCell = document.querySelector(`.cell[rid='${i}'][cid='${j}']`);
        $eachCell.addEventListener('blur',(e)=>{
            let target = (e.target);
            sheetDb[target.getAttribute('rid')][target.getAttribute('cid')]['value'] = target.innerText;;
            updateCurrSelectedCell(currCellSelected);
            // console.log(sheetDb[target.getAttribute('rid')][target.getAttribute('cid')].value)
        })
    }
}

$functionBar.addEventListener('keyup',(e)=>{
    if(e.key == "Enter" && e.target.value !== ""){
        let res = evaluateExpression(e.target.value);
        currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
        currCellStorageObject['value']=res;
        currCellStorageObject['formula']=e.target.value;
        // e.target.value = "";
        updateCurrSelectedCell(currCellSelected);
    }
});
function evaluateExpression(exp){
    try {
        let expArr = exp.split(' ');
        let childArr = [];
        for(let i = 0;i<expArr.length;i++){
            let ascciValueOfFirstChar = expArr[i].charCodeAt(0);
            if(ascciValueOfFirstChar>=65 && ascciValueOfFirstChar<=90){
                childArr.push(expArr[i]);
                expArr[i]=findValueOfCellUsingAddress(expArr[i]);
                
            }
        }
        
        let res = eval(expArr.join(''));
        // console.log(childArr);
        addValueOfChildToParent(childArr);
        return res;
      }
      catch(err) {
        return exp;
      }
};
function findValueOfCellUsingAddress(address){
    let colIndex = address.charCodeAt(0)-65;
    let rowIndex = JSON.parse(address.charAt(1))-1;
    // console.log(colIndex,rowIndex);
    let cellObj = sheetDb[rowIndex][colIndex]['value'];
    // console.log(cellObj);
    return cellObj; 
}

function addValueOfChildToParent(childList){
    if(childList.length==0){
        return;
    }
    console.log(childList,'child');
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    console.log(currCellStorageObject.children,'children');
}