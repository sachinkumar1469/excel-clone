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
            // console.log(sheetDb[target.getAttribute('rid')][target.getAttribute('cid')].value)
        })
    }
}

$functionBar.addEventListener('keyup',(e)=>{
    if(e.key == "Enter" && e.target.value !== ""){
        let res = evaluateExpression(e.target.value);
        currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
        currCellStorageObject['value']=res;
        e.target.value = "";
        updateCurrSelectedCell(currCellSelected);
    }
});
function evaluateExpression(exp){
    try {
        let res = eval(exp);
        return res;
      }
      catch(err) {
        return exp;
      }
};