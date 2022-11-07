// $functionBar  currCellSelected

// console.log(currCellSelected.getAttribute('cid'),currCellSelected.getAttribute('rid'));
// console.log(document.querySelector(`.cell[rid='1'][cid='1']`));


// To add event listener for blur on each cell
for(let i = 0; i<row;i++){
    for(let j = 0;j<col;j++){
        let $eachCell = document.querySelector(`.cell[rid='${i}'][cid='${j}']`);
        $eachCell.addEventListener('blur',(e)=>{
            let target = (e.target);
            // sheetDb[target.getAttribute('rid')][target.getAttribute('cid')]['formula'] = target.innerText;;
            sheetDb[target.getAttribute('rid')][target.getAttribute('cid')]['value'] = target.innerText;;
            updateCurrSelectedCell(currCellSelected);
            // console.log(sheetDb[target.getAttribute('rid')][target.getAttribute('cid')].value)
        })
    }
}

$functionBar.addEventListener('keyup',(e)=>{
    if(e.key == "Enter" && e.target.value !== ""){
        // let res = evaluateExpression(e.target.value);
        currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
        // currCellStorageObject['value']=res;
        currCellStorageObject['formula']=e.target.value;
        // currCellStorageObject['value']=e.target.value;
        
        // e.target.value = "";
        updateCurrSelectedCell(currCellSelected);
    }
});

function addValueOfChildToParent(childList){
    if(childList.length==0){
        return;
    }
    // console.log(childList,'child');   
    for(let i = 0;i<childList.length;i++){
        addCurrElementAsChildToParent(childList[i])
    }
    // console.log(currCellStorageObject['children']);
}
function addCurrElementAsChildToParent(parentAddress){
    let storageObj = findValueOfCellUsingAddress(parentAddress);
    if(!storageObj['children'].includes(currCellSelected)){
        storageObj['children'].push(currCellSelected);
    }
    // console.log(storageObj['children'],'PARENT IS',storageObj);
    
}

