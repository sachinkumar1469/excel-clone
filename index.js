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

let currCellSelected;


// Sheet database
let sheetDb = [];
for(let i = 0;i<row;i++){
    let sheetRow = [];
    for(let j = 0;j<col;j++){
        let cellProp = {
            'bold':false,
            'italic':false,
            underline:false,
            alignment:'center',
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

//To create row column
for(let i = 1; i<=row ;i++){
    let $rowEl = document.createElement('div');
    $rowEl.classList.add(`row-count`);
    $rowEl.textContent = i;
    $rowRepCol.appendChild($rowEl);
    
}
//To create column row
for(let i = 0;i<26;i++){
    let $colEl = document.createElement('div');
    $colEl.classList.add('col-count');
    $colEl.textContent = String.fromCharCode(65+ i);
    $colRepRow.appendChild($colEl);
}

// To create cell
for(let i = 1; i<=row;i++){
    let $cellGridRow = document.createElement('div');
    $cellGridRow.classList.add('cell-grid-row');
    for(let j = 1; j<=col; j++){
        let $cell = document.createElement('div');
        $cell.classList.add('cell');
        $cell.setAttribute('id',`${i}${String.fromCharCode(64+j)}`);
        $cell.setAttribute('spellcheck','false');
        
        $cell.setAttribute('rid',`${i-1}`)
        $cell.setAttribute('cid',`${j-1}`)
        $cellGridRow.appendChild($cell)
        addEventListenerForAddressBar($cell,i,j);
        addEventListenerForDbClick($cell);
    }
    
    $cellGird.appendChild($cellGridRow);
}

//Function to add address bar event listener
function addEventListenerForAddressBar($cell,i,j){
    $cell.addEventListener('click',(event)=>{
        $addressBar.value = `${String.fromCharCode(64+j)}${i}`;
        removePrevCellProp(currCellSelected);
        if($cell != currCellSelected){
            removeDBclickProp(currCellSelected);
        }
        
        currCellSelected = $cell;
        updateCurrSelectedCell(currCellSelected);
    })
}

//To remove previous cell double click properties
function removeDBclickProp(currCellSelected){   
    if(currCellSelected == null){
        return;
    }   
    currCellSelected.removeAttribute('contenteditable');
}

//To add event listener to make content editable
function addEventListenerForDbClick($cell){
    $cell.addEventListener('dblclick',(e)=>{
        $cell.setAttribute('contenteditable','true');
        
    })
}

// To remove previous selected cell properties
function removePrevCellProp(currCellSelected){
    if(currCellSelected==null){
        return;
    }
   
    currCellSelected.style.borderRight = `1px solid rgb(132, 130, 130)`;
    currCellSelected.style.borderBottom = `1px solid rgb(132, 130, 130)`;
    currCellSelected.style.borderLeft = `none`;
    currCellSelected.style.borderTop = `none`;
    
}
function updateCurrSelectedCell(currCellSelected){
    if(currCellSelected==null){
        return;
    }
    currCellSelected.style.border = `2px solid blue`;
    currCellStorageObject = sheetDb[currCellSelected.getAttribute('rid')][currCellSelected.getAttribute('cid')];
    let isBold = currCellStorageObject['bold'];
    if(isBold){
        currCellSelected.style.fontWeight = "900";
        $bold.style.backgroundColor = 'lightgrey';
    } else {
        currCellSelected.style.fontWeight = "100";
        $bold.style.backgroundColor = 'transparent';
    }
    let isItalic = currCellStorageObject['italic'];
    if(isItalic){
        currCellSelected.style.fontStyle = "italic";
        $italic.style.backgroundColor='lightgrey';
    } else {
        currCellSelected.style.fontStyle = "normal";
        $italic.style.backgroundColor='transparent';
    }
    let isUnderline = currCellStorageObject['underline'];
    if(isUnderline){
        currCellSelected.style.textDecoration = "underline";
        $udline.style.backgroundColor='lightgrey';
    } else {
        currCellSelected.style.textDecoration = "none";
        $udline.style.backgroundColor='transparent';
    }
    let alignment = currCellStorageObject['alignment'];
    switch(alignment){
        case 'left' : {
            currCellSelected.style.justifyContent = "left";
            $leftAlign.style.backgroundColor = "lightgrey";
            $rightAlign.style.backgroundColor = "transparent";
            $centerAlign.style.backgroundColor = "transparent";
            break;
        }
        case 'right' : {
            currCellSelected.style.justifyContent = "right";
            $rightAlign.style.backgroundColor = "lightgrey";
            $centerAlign.style.backgroundColor = "transparent";
            $leftAlign.style.backgroundColor = "transparent";
            break;
        }
        case 'center' : {
            currCellSelected.style.justifyContent = "center";
            $centerAlign.style.backgroundColor = "lightgrey";
            $leftAlign.style.backgroundColor = "transparent";
            $rightAlign.style.backgroundColor = "transparent";
            break;
        }
    }

    //To update font family
    let fontFamilyOfCell = currCellStorageObject['fontFamily'];
    currCellSelected.style.fontFamily = fontFamilyOfCell;
    $fontFamily.value=fontFamilyOfCell;

    //To update font size
    let fontSizeOfCell = currCellStorageObject['fontSize'];   
    currCellSelected.style.fontSize = fontSizeOfCell;  
    $fontSize.value=fontSizeOfCell;
    
    //To update the color
    let colorOfCell = currCellStorageObject['fontColor'];
    currCellSelected.style.color = colorOfCell;
    

    let valueOfFormulaBar = currCellStorageObject['formula']?currCellStorageObject['formula']:currCellStorageObject['value'];
    $functionBar.value = valueOfFormulaBar;

    let valueOfCell = currCellStorageObject['value'];
    let valueOfCellUsingFormula = evaluateExpression(valueOfFormulaBar);
    currCellStorageObject['value'] = valueOfCellUsingFormula?valueOfCellUsingFormula:valueOfCell;
    currCellSelected.innerText = currCellStorageObject['value'];
    // currCellSelected.innerText = valueOfCell;

    $fontColor.value = colorOfCell;
}

function evaluateExpression(exp){
    // console.log('just befor making call to eva function',exp);
    
    try {
        
        let expArr = exp.split(' ');
        let childArr = [];
        for(let i = 0;i<expArr.length;i++){
            let ascciValueOfFirstChar = expArr[i].charCodeAt(0);
            if(ascciValueOfFirstChar>=65 && ascciValueOfFirstChar<=90){
                childArr.push(expArr[i]);
                expArr[i]=findValueOfCellUsingAddress(expArr[i])['value'];
                
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
    let cellObj = sheetDb[rowIndex][colIndex];
    // console.log(cellObj);
    return cellObj; 
}


document.querySelector('.cell').click();