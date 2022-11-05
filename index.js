let sheetTitleEl = document.getElementById('sheet-title');


sheetTitleEl.value = "Untitled Spreadsheet";

sheetTitleEl.addEventListener('change',(e)=>{
    
    document.title = `${sheetTitleEl.value} - Sheets`;
});

const row = 100;
const col = 26;

let $rowContainer = document.querySelector('.row-container');
let $colContainer = document.querySelector('.col-container');

for(let i = 1; i<=row ;i++){
    let $rowEl = document.createElement('div');
    $rowEl.classList.add(`row-count`);
    $rowEl.textContent = i;
    $rowContainer.appendChild($rowEl);
    
}

for(let i = 0;i<26;i++){
    let $colEl = document.createElement('div');
    $colEl.classList.add('col-count');
    $colEl.textContent = String.fromCharCode(65+ i);
    $colContainer.appendChild($colEl);
}
