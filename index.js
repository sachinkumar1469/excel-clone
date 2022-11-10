let sheetTitleEl = document.getElementById('sheet-title');


sheetTitleEl.value = "Untitled Spreadsheet";

sheetTitleEl.addEventListener('change',(e)=>{
    
    document.title = `${sheetTitleEl.value} - Sheets`;
});

const row = 100;
const col = 26;

let $rowRepCol = document.querySelector('.address-col-cont');
let $colRepRow = document.querySelector('.address-row-cont');
let $cellGird = document.querySelector('.cell-grid');
let $addressBar = document.querySelector('.address-bar');
let $functionBar = document.querySelector('.function-bar');

let $fontFamily = document.querySelector('.fontFamily');
let $fontSize = document.querySelector('.fontSize');
let $bold = document.querySelector('.bold');
let $italic = document.querySelector('.italic');
let $udline = document.querySelector('.udline');
let $leftAlign = document.querySelector('.leftAlign');
let $rightAlign = document.querySelector('.rightAlign');
let $centerAlign = document.querySelector('.centerAlign');
let $fontColor = document.querySelector('#fontColor');

// let currCellSelected;


// Sheet database
let sheetDb = [];
for(let i = 0;i<row;i++){
    let sheetRow = [];
    for(let j = 0;j<col;j++){
        let cellProp = {
            'bold':false,
            'italic':false,
            underline:false,
            alignment:'left',
            fontFamily:'sans-serif',
            fontSize:'medium',
            fontColor:'#000000',
            BgColor:'white',
            value:"",
            formula:"",
            children:[]
        }
        sheetRow.push(cellProp);
    }
    sheetDb.push(sheetRow);
}

//To create column of row's
for(let i = 1; i<=row ;i++){
    let $rowEl = document.createElement('div');
    $rowEl.setAttribute('rowId',`${i-1}`);
    $rowEl.classList.add(`row-count`);
    $rowEl.textContent = i;
    $rowRepCol.appendChild($rowEl);
    
}
//To create row of column's
for(let i = 0;i<26;i++){
    let $colEl = document.createElement('div');
    $colEl.setAttribute('colId',`${i}`)
    $colEl.classList.add('col-count');
    $colEl.textContent = String.fromCharCode(65+ i);
    $colRepRow.appendChild($colEl);
}

// To create cell
for(let i = 1; i<=row;i++){
    let $cellGridRow = document.createElement('div');
    $cellGridRow.classList.add('cell-grid-row');
    for(let j = 1; j<=col; j++){
        let $cell = document.createElement('input');
        $cell.classList.add('cell');
        $cell.setAttribute('id',`${String.fromCharCode(64+j)}${i}`);
        $cell.setAttribute('spellcheck','false');
        $cell.setAttribute('value',"");
        $cell.setAttribute('type','text');
        $cell.setAttribute('rid',`${i-1}`)
        $cell.setAttribute('cid',`${j-1}`)
        
        $cellGridRow.appendChild($cell)
        
    }
    
    $cellGird.appendChild($cellGridRow);
}


// Utility Functions

// Function to update the cell properties in UI

function updateCellInUi(cell){
    let row = cell.getAttribute('rid');
    let col = cell.getAttribute('cid');
    const dbObj = sheetDb[row][col];
    
    let isBold = dbObj['bold'];
    if(isBold){
        cell.style.fontWeight = 'bold';
        $bold.style.backgroundColor = 'lightgrey';
    } else {
        cell.style.fontWeight = 'normal';
        $bold.style.backgroundColor = 'transparent';
    }

    let isItalic = dbObj['italic'];
    if(isItalic){
        cell.style.fontStyle = "italic";
        $italic.style.backgroundColor='lightgrey';
    } else {
        cell.style.fontStyle = "normal";
        $italic.style.backgroundColor='transparent';
    }

    let isUnderline = dbObj['underline'];
    if(isUnderline){
        cell.style.textDecoration = "underline";
        $udline.style.backgroundColor='lightgrey';
    } else {
        cell.style.textDecoration = "none";
        $udline.style.backgroundColor='transparent';
    }

    let alignmentOfText = dbObj['alignment'];
    switch(alignmentOfText){
        case 'left' : {
            cell.style.textAlign = "left";
            $leftAlign.style.backgroundColor = "lightgrey";
            $rightAlign.style.backgroundColor = "transparent";
            $centerAlign.style.backgroundColor = "transparent";
            break;
        }
        case 'right' : {
            cell.style.textAlign = "right";
            $rightAlign.style.backgroundColor = "lightgrey";
            $centerAlign.style.backgroundColor = "transparent";
            $leftAlign.style.backgroundColor = "transparent";
            break;
        }
        case 'center' : {
            cell.style.textAlign = "center";
            $centerAlign.style.backgroundColor = "lightgrey";
            $leftAlign.style.backgroundColor = "transparent";
            $rightAlign.style.backgroundColor = "transparent";
            break;
        }
    }

    let fontFamilyOfCell = dbObj['fontFamily'];
    cell.style.fontFamily = fontFamilyOfCell;
    $fontFamily.value=fontFamilyOfCell;

    let fontSizeOfCell = dbObj['fontSize'];
    cell.style.fontSize = fontSizeOfCell;  
    $fontSize.value=fontSizeOfCell;

    let colorOfCell = dbObj['fontColor'];
    cell.style.color = colorOfCell;

    let valueOfFormulaBar = dbObj['formula'];
    $functionBar.value = valueOfFormulaBar;

    let valueOfCell = dbObj['value'];
    cell.value = dbObj['value'];

    let childrens = dbObj['children'];
    // console.log(childrens);

    updateUiOfChildrens(childrens);
    
}

// This function update the ui of childrens when value of parent element changes
// This is a recursive function
function updateUiOfChildrens(childrens){
     for(let i = 0; i<childrens.length; i++){
        let child = childrens[i];
        let childDb = returnStorageObjOfCellByUsingAddress(child);
        // console.log(childDb);
        childDb['value'] = evaluateExpression(childDb['formula'],'',child);
        // console.log(child);
        let childElement = cellDiv(child);
        childElement.value = childDb['value'];
        updateUiOfChildrens(childDb['children']);
    }
}

// This function return cell div from html using address
function cellDiv(address){
    return document.querySelector(`.cell[id*="${address}"]`);
}


// This function return the storage object of particular cell from the sheeDB it takes cell address as a parameter
function returnStorageObjOfCellByUsingAddress(address){
    let colIn = address.charCodeAt(0)-65;
    let rowIn = JSON.parse(address.slice(1))-1;
    return sheetDb[rowIn][colIn];
}

// This function return the address of current selected cell
function currentSelectedCellAddress(){
    return $addressBar.value;
}


// Event listener to add border to active cell
let $previousBorderedCell = document.querySelector('.cell');
document.querySelectorAll('.cell').forEach((cell)=>{
    cell.addEventListener('click',(_e)=>{
        $previousBorderedCell.style.border = "none";
        $previousBorderedCell.style.borderRight = `1px solid rgb(132, 130, 130)`;
        $previousBorderedCell.style.borderBottom = `1px solid rgb(132, 130, 130)`;
        let $prevColCount = document.querySelector(`.col-count[colId*='${$previousBorderedCell.getAttribute('cid')}']`);
        let $prevRowCount = document.querySelector(`.row-count[rowId*='${$previousBorderedCell.getAttribute('rid')}']`);
        $prevColCount.style.backgroundColor = "transparent";
        $prevRowCount.style.backgroundColor = "transparent";


        $previousBorderedCell = cell;

        

        let $colCount = document.querySelector(`.col-count[colId*='${cell.getAttribute('cid')}']`);
        let $rowCount = document.querySelector(`.row-count[rowId*='${cell.getAttribute('rid')}']`);
        $colCount.style.backgroundColor = "#cbd0d2";
        $rowCount.style.backgroundColor = "#cbd0d2";

        cell.style.border = '2px solid blue';
        $addressBar.value = cell.getAttribute('id');  // It sets the address to the value of active cell
        updateCellInUi(cellDiv(currentSelectedCellAddress()));
    })
});

// This function evalutes the given expression 
function evaluateExpression(exp,oldExp='',currCell){ 
    try {
        if(exp == ''){
            if(oldExp != exp){
                removeChildrens(oldExp,currCell);
            }
            return '';
        }
        let expArr = exp.split(' ');
        let childArr = [];
        for(let i = 0;i<expArr.length;i++){
            let ascciValueOfFirstChar = expArr[i].charCodeAt(0);
            if(ascciValueOfFirstChar>=65 && ascciValueOfFirstChar<=90){        
                expArr[i]=returnStorageObjOfCellByUsingAddress(expArr[i])['value'];     
                
            }
        }   
        let res = eval(expArr.join(''));
        if(oldExp != exp){
            removeChildrens(oldExp,currCell);
            removeChildFromGraphComponent(oldExp,currCell);
        }
        addChildToGraphComponent(exp,currCell);
        let isCyclic = checkGraphCycle();
        if(isCyclic){
            window.alert(`change the ${exp} formula because it forms the infinite recursive cycle`)
            removeChildFromGraphComponent(exp,currCell);
            return '';
        }
        addChildToParent(exp,currCell);
        return res;
      }
      catch(err) {
        console.log('catch error fuck you',err);
        return exp;
      }
};


// This function add Childrens to Parent
function addChildToParent(exp,childCell){
    let expArr = exp.split(' ');
    for(let i = 0; i<expArr.length; i++){
        let ascciValueOfI = expArr[i].charCodeAt(0);
        if(ascciValueOfI>=65 && ascciValueOfI<=90){
            let parent = expArr[i];
            // console.log(parent,"is parent to the child",childCell);
            if(!returnStorageObjOfCellByUsingAddress(parent)['children'].includes(childCell)){
                returnStorageObjOfCellByUsingAddress(parent)['children'].push(childCell);
            }
            // console.log(returnStorageObjOfCellByUsingAddress(parent)['children'],"this is parents sheetBd",parent);
        }
    }
}

function removeChildrens(exp, childCell){
    if(exp == "" || exp == undefined){
        return;
    }
    // console.log("remove children called and old formula is",exp);
    let expArr = exp.split(' ');
    for(let i = 0; i<expArr.length;i++){
        let ascciValue = expArr[i].charCodeAt(0);
        if(ascciValue >= 65 && ascciValue <=90){
            let parent = expArr[i];
            let indexOfChildInParentsArray = returnStorageObjOfCellByUsingAddress(parent)['children'].indexOf(childCell);
            let res = returnStorageObjOfCellByUsingAddress(parent)['children'].splice(indexOfChildInParentsArray,1);
            // console.log(res);
        }
    }
}
document.querySelector('.cell').click();