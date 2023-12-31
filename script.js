const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");

const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

const borderbtmbtn = document.getElementById("border-btm-btn");
const borderleftbtn = document.getElementById("border-left-btn");
const borderrightbtn = document.getElementById("border-right-btn");
const bordertopbtn = document.getElementById("border-top-btn");
const borderouterbtn = document.getElementById("border-outer-btn");

const fontSizeDropDown = document.getElementById("font-size");
const fontFamilyDropDown = document.getElementById("font-family");

const leftAlignBtn = document.getElementById("left-align-btn");
const centerAlignBtn = document.getElementById("center-align--btn");
const rightAlignBtn = document.getElementById("right-align--btn");

const uploadJsonFile = document.getElementById("jsonFile");
const addSheetButton = document.getElementById("add-sheet-button");
const buttonContainer = document.getElementById("button-container");
const sheetNo = document.getElementById("sheet-no");

const cols = 26;
const rows = 100;
let currCell;
let currentsheetid = 1;

cutCell = {};

let matrixtemplate = [];
for (let i = 0; i < rows; i++) {
  let temprow = [];
  for (let j = 0; j < cols; j++) {
    temprow.push({});
  }
  matrixtemplate.push(temprow);
}
localStorage.setItem("arrMatrix", JSON.stringify([matrixtemplate]));


let matrix = new Array(rows);
function createMatrix() {
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = {};
    }
  }
}

for (let col = 0; col < cols; col++) {
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(65 + col);
  thead.appendChild(th);
}

function createTable() {
  for (let row = 1; row <= rows; row++) {
    let tr = document.createElement("tr");
    tr.innerText = row;
    tbody.appendChild(tr);
    for (let col = 0; col < cols; col++) {
      let td = document.createElement("td");
      td.setAttribute("contenteditable", "true");
      td.setAttribute("spellCheck", "false");
      // this event will revolve around input
      td.addEventListener("input", (event) => onInputFun(event));

      // this event revolves around focus on a cell
      td.addEventListener("focus", (event) => onFocusFun(event));

      td.setAttribute("id", `${String.fromCharCode(65 + col)}${row}`);
      tr.appendChild(td);
    }
  }
}

createTable();
createMatrix();

function updateMatrix(currCell) {
  let tempObj = {
    style: currCell.style.cssText,
    text: currCell.innerText,
    id: currCell.id,
  };
  let i = currCell.id.substring(1) - 1;
  let j = currCell.id[0].charCodeAt(0) - 65;
  // currentCell.id[0] -> this will give me character
  // str.chatCodeAt(i) will give me respective ascii at ith index of string str
  // -65 for making ascii code to 0th index
  let matrixArrdata = JSON.parse(localStorage.getItem("arrMatrix"));
  console.log("id", currentsheetid);
  matrixArrdata[currentsheetid - 1][i][j] = tempObj;
  localStorage.setItem("arrMatrix", JSON.stringify(matrixArrdata));
}

function onFocusFun(event) {
  console.log("In focus:", event.target);
  currCell = event.target;
  document.getElementById("current-cell").innerText = event.target.id;
  console.log(currCell.style.cssText);
  if (currCell.style.fontWeight === "bold") {
    boldBtn.style.backgroundColor = "yellow";
  } else boldBtn.style.backgroundColor = "transparent";
  //   console.log(currCell.innerText);
  //   console.log(currCell.id);
  updateMatrix(currCell);
}

function onInputFun(event) {
  console.log("input:", event.target);
  updateMatrix(event.target);
  // id
  // cell content -> innerText
  // cell style -> cssText
}

boldBtn.addEventListener("click", () => {
  if (currCell.style.fontWeight == "bold") {
    currCell.style.fontWeight = "normal";
  } else {
    currCell.style.fontWeight = "bold";
  }
  console.log("bold", currCell);
  // latest style should be passed to updated matrix
  updateMatrix(currCell);
});

italicsBtn.addEventListener("click", () => {
  if (currCell.style.fontStyle == "italic") {
    currCell.style.fontStyle = "normal";
  } else {
    currCell.style.fontStyle = "italic";
  }
  console.log("italics", currCell);
  // latest style should be passed to updated matrix
  updateMatrix(currCell);
});

underlineBtn.addEventListener("click", () => {
  if (currCell.style.textDecoration == "underline") {
    currCell.style.textDecoration = null;
  } else {
    currCell.style.textDecoration = "underline";
  }
  console.log("underline", currCell);
  // latest style should be passed to updated matrix
  updateMatrix(currCell);
});

textColor.addEventListener("input", () => {
  currCell.style.color = textColor.value;
  updateMatrix(currCell);
});

bgColor.addEventListener("input", () => {
  currCell.style.backgroundColor = bgColor.value;
  updateMatrix(currCell);
});

leftAlignBtn.addEventListener("click", () => {
  currCell.style.textAlign = "left";
  updateMatrix(currCell);
});

centerAlignBtn.addEventListener("click", () => {
  currCell.style.textAlign = "center";
  updateMatrix(currCell);
});

rightAlignBtn.addEventListener("click", () => {
  currCell.style.textAlign = "right";
  updateMatrix(currCell);
});

borderbtmbtn.addEventListener("click", () => {
  if (currCell.style.borderBottom == "2px solid black") {
    currCell.style.borderBottom = "1px solid lightgray";
  }
  else {
      currCell.style.borderBottom = "2px solid black";
  }
  updateMatrix(currCell);
});

borderleftbtn.addEventListener("click", () => {
  if (currCell.style.borderLeft == "2px solid black") {
    currCell.style.borderLeft = "1px solid lightgray";
  }
  else {
      currCell.style.borderLeft = "2px solid black";
  }
  updateMatrix(currCell);
});

borderrightbtn.addEventListener("click", () => {
  if (currCell.style.borderright == "2px solid black") {
    currCell.style.borderRight = "1px solid lightgray";
  }
  else {
      currCell.style.borderRight = "2px solid black";
  }
  updateMatrix(currCell);
});

bordertopbtn.addEventListener("click", () => {
  if (currCell.style.borderTop == "2px solid black") {
    currCell.style.borderTop = "1px solid lightgray";
  }
  else {
      currCell.style.borderTop = "2px solid black";
  }
  updateMatrix(currCell);
});

borderouterbtn.addEventListener("click", () => {
  if (currCell.style.border == "2px solid black") {
    currCell.style.border = "1px solid lightgray";
  }
  else {
      currCell.style.border = "2px solid black";
  }
  updateMatrix(currCell);
});

fontSizeDropDown.addEventListener("change", () => {
  currCell.style.fontSize = fontSizeDropDown.value;
  // what ever option tag is chosen by the end user is
  // mapped with select tag with value attribute
  updateMatrix(currCell);
});

fontFamilyDropDown.addEventListener("change", () => {
  currCell.style.fontFamily = fontFamilyDropDown.value;
  updateMatrix(currCell);
});

cutBtn.addEventListener("click", () => {
  cutCell = {
    text: currCell.innerText,
    style: currCell.style.cssText,
  };
  currCell.innerText = "";
  currCell.style.cssText = "";
  updateMatrix(currCell);
});

copyBtn.addEventListener("click", () => {
  cutCell = {
    text: currCell.innerText,
    style: currCell.style.cssText,
  };
});

pasteBtn.addEventListener("click", () => {
  currCell.innerText = cutCell.text;
  currCell.style.cssText = cutCell.style;
  updateMatrix(currCell);
});

function downloadJson() {
  // 2d matrix into string
  const matrixString = JSON.stringify(matrix);
  // text form of matrix -> piece of memory (downloadable)
  // application/json -> format for json
  const blob = new Blob([matrixString], { type: "application/json" });
  // link created -> attach href
  // click link
  // delete link
  const link = document.createElement("a");
  // 211 -> converting piece of memory to downloadable link
  link.href = URL.createObjectURL(blob);
  // download the link instead of opening it
  // link.download -> file name
  link.download = "table.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

uploadJsonFile.addEventListener("change", uploadJSONFileFn);

function uploadJSONFileFn(event) {
  const file = event.target.files[0];
  if (file) {
    // this can read external file
    const reader = new FileReader();
    // how you you trigger reader?
    // .readAsText method will trigger reader and it will run onload default method
    reader.readAsText(file);
    reader.onload = function (e) {
      const fileContent = e.target.result;
      try {
        // updated my matrix
        matrix = JSON.parse(fileContent);
        matrix.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              let cellToBeEdited = document.getElementById(cell.id);
              cellToBeEdited.innerText = cell.text;
              cellToBeEdited.style.cssText = cell.style;
            }
            // else empty object-> do nothing
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
}
//const arrMatrix = 'arrMatrix';

//arrMatrix - [matrix1, matrix2, matrix3]
let numSheets = 1;
let currSheetNum = 1;

addSheetButton.addEventListener("click", () => {
  const btn = document.createElement("button");
  numSheets++;
  currSheetNum = numSheets;
  btn.innerText = `Sheet ${numSheets}`;
  btn.setAttribute("class", "sheet")
  btn.setAttribute("id", `sheet-${currSheetNum}`);
  btn.setAttribute("onclick", "viewSheet(event)");
  buttonContainer.append(btn);

  // storing the previous matrix(table)
  if (localStorage.getItem("arrMatrix")) {
    var oldMatrixArr = localStorage.getItem("arrMatrix");

    //oldMatrixArr ---> string
    var newMatrixArr = [...JSON.parse(oldMatrixArr), matrixtemplate];
    // console.log("old",oldMatrixArr);
    // console.log(newMatrixArr);
    // appending(pushing) matrix to oldMatrixArr
    // var newMatrixArr = JSON.parse(oldMatrixArr)
    // newMatrixArr.push(matrix)
    localStorage.setItem("arrMatrix", JSON.stringify(newMatrixArr));
  } else {
    let tempMatrixArr = [matrix];
    localStorage.setItem("arrMatrix", JSON.stringify(tempMatrixArr));
  }

  // clean up virtual memory
  createMatrix();
  sheetNo.innerText = `Sheet No - ${currSheetNum}`;
  currentsheetid = currSheetNum;
  tbody.innerHTML = ``;
  createTable();
});

function viewSheet(event) {
  console.log("viewsheet:", event.target);
  let id = event.target.id.split("-")[1];
  currentsheetid = id;
  console.log(currentsheetid);
  var matrixArr = JSON.parse(localStorage.getItem("arrMatrix"));
  matrix = matrixArr[id - 1];
  //console.log(matrix[0][0]);
  // current matrix points towards the latest currentsheet
  // clean previous table;
  tbody.innerHTML = ``;
  createTable();

  matrix.forEach((row) => {
    row.forEach((cell) => {
      try {
        if (cell.id) {
          let cellToBeEdited = document.getElementById(cell.id);
          cellToBeEdited.innerText = cell.text;
          cellToBeEdited.style.cssText = cell.style;
        }
        // else empty object-> do nothing
      } catch (err) {
        console.log(err);
      }
    });
  });
  currSheetNum = id;
  sheetNo.innerText = `Sheet No - ${currSheetNum}`;
}
