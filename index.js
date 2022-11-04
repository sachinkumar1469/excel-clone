let sheetTitleEl = document.getElementById('sheet-title');


sheetTitleEl.value = "Untitled Spreadsheet";

sheetTitleEl.addEventListener('change',(e)=>{
    
    document.title = `${sheetTitleEl.value} - Sheets`;
})
