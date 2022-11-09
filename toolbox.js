$bold.addEventListener('click',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['bold'] = !currCellSheetDBObj['bold'];
    updateCellInUi(cellDiv(currSelectedCell));
});

$italic.addEventListener('click',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['italic'] = !currCellSheetDBObj['italic'];
    updateCellInUi(cellDiv(currSelectedCell));
});

$udline.addEventListener('click',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['underline'] = !currCellSheetDBObj['underline'];
    updateCellInUi(cellDiv(currSelectedCell));
});

$leftAlign.addEventListener('click',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['alignment'] = 'left';
    updateCellInUi(cellDiv(currSelectedCell));
});

$rightAlign.addEventListener('click',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['alignment'] = 'right';
    updateCellInUi(cellDiv(currSelectedCell));
});

$centerAlign.addEventListener('click',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['alignment'] = 'center';
    updateCellInUi(cellDiv(currSelectedCell));
});

$fontFamily.addEventListener("change",(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['fontFamily'] = e.target.value;
    updateCellInUi(cellDiv(currSelectedCell));
});

$fontSize.addEventListener('change',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['fontSize'] = e.target.value;
    updateCellInUi(cellDiv(currSelectedCell));
});

$fontColor.addEventListener('change',(e)=>{
    let currSelectedCell = currentSelectedCellAddress();
    let currCellSheetDBObj = returnStorageObjOfCellByUsingAddress(currSelectedCell);
    currCellSheetDBObj['fontColor'] = e.target.value;
    updateCellInUi(cellDiv(currSelectedCell));
})