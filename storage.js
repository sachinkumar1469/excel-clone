let sheetDb = [];

for(let i = 0;i<row;i++){
    let sheetRow = [];
    for(let j = 0;j<col;j++){
        let cellProp = {
            'bold':false,
            'italic':false,
            underline:false,
            alignment:'left',
            fontFamily:'monospace',
            fontSize:'14',
            fontColor:'#000000',
            BgColor:'#fff'
        }
        sheetRow.push(cellProp);
    }
    sheetDb.push(sheetRow);
}

function render(currCellSelected){
    let currCellSelectedObj = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    console.log(currCellSelected);
    
}



let $fontFamily = document.querySelector('.fontFamily');
let $fontSize = document.querySelector('.fontSize');
let $bold = document.querySelector('.bold');
let $italic = document.querySelector('.italic');
let $udline = document.querySelector('.udline');
let $leftAlign = document.querySelector('.leftAlign');
let $rightAlign = document.querySelector('.rightAlign');
let $centerAlign = document.querySelector('.centerAlign');
let $fontColor = document.querySelector('#fontColor');




