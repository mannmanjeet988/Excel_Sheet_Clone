const thead = document.getElementById("table-heading-row");
const tbody =document.getElementById("table-body");

const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

const leftAlignBtn = document.getElementById("left-align-btn");
const centerAlignBtn = document.getElementById("center-align--btn");
const rightAlignBtn = document.getElementById("right-align--btn");

const cols=26;
const rows=100;
let currCell;

for (let col = 0; col < cols; col++) {
    let th = document.createElement("th");
    th.innerText = String.fromCharCode(65 + col);
    thead.appendChild(th);
}


for(let row =1; row<=rows; row++){
    let tr = document.createElement("tr");
    tr.innerText= row;
    tbody.appendChild(tr);
    for(let col=0; col< cols; col++){
        let td = document.createElement("td");
        td.setAttribute("contenteditable","true");
        td.setAttribute("spellCheck","false");
        td.addEventListener("focus",(event)=>onFocusFun(event));
        td.setAttribute("id",`${String.fromCharCode(65 + col)}${row}`)
        tr.appendChild(td); 
    }
}

function onFocusFun(event){
    console.log("In focus:", event.target);
    currCell = event.target;
    document.getElementById("current-cell").innerText = event.target.id;
    console.log(currCell.style.cssText);
//   console.log(currCell.innerText);
//   console.log(currCell.id);
}
 
boldBtn.addEventListener("click",()=>{
    if(currCell.style.fontWeight == "bold"){
        currCell.style.fontWeight = "normal";
    }
    else{
        currCell.style.fontWeight = "bold" ;   
    }
    console.log("bold",currCell);
})

italicsBtn.addEventListener("click",()=>{
    if(currCell.style.fontStyle == "italic"){
        currCell.style.fontStyle = "normal";
    }
    else{
        currCell.style.fontStyle = "italic" ;   
    }
    console.log("italics",currCell);
})

underlineBtn.addEventListener("click",()=>{
    if(currCell.style.textDecoration == "underline"){
        currCell.style.textDecoration = null;
    }
    else{
        currCell.style.textDecoration = "underline" ;   
    }
    console.log("underline",currCell);
})

textColor.addEventListener("change",()=>{
    currCell.style.color = textColor.value;
})

bgColor.addEventListener("change",()=>{
    currCell.style.backgroundColor = bgColor.value;
})

leftAlignBtn.addEventListener("click",()=>{
    currCell.style.textAlign ="left";
})

centerAlignBtn.addEventListener("click",()=>{
    currCell.style.textAlign ="center";
})

rightAlignBtn.addEventListener("click",()=>{
    currCell.style.textAlign ="right";
})