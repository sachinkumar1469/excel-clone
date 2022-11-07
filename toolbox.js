$bold.addEventListener('click',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['bold']=!currCellStorageObject['bold'];
    updateCurrSelectedCell(currCellSelected);
})
$italic.addEventListener('click',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['italic']=!currCellStorageObject['italic'];
    updateCurrSelectedCell(currCellSelected);
})
$udline.addEventListener('click',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['underline']=!currCellStorageObject['underline'];
    updateCurrSelectedCell(currCellSelected);
})

$leftAlign.addEventListener('click',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['alignment']='left';
    updateCurrSelectedCell(currCellSelected);
})
$rightAlign.addEventListener('click',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['alignment']='right';
    updateCurrSelectedCell(currCellSelected);
})
$centerAlign.addEventListener('click',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['alignment']='center';
    updateCurrSelectedCell(currCellSelected);
})
$fontFamily.addEventListener("change",(e)=>{
    // console.log(e.target.value);
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['fontFamily'] = e.target.value;
    updateCurrSelectedCell(currCellSelected);
})

$fontSize.addEventListener('change',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['fontSize'] = e.target.value;
    updateCurrSelectedCell(currCellSelected);
    // console.log(e.target.value);
})

$fontColor.addEventListener('change',(e)=>{
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    currCellStorageObject['fontColor'] = e.target.value;
    updateCurrSelectedCell(currCellSelected);
})