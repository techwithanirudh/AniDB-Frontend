const nameEl = document.querySelector("#dbname");
const columnsEl = document.querySelector("#columns");
const bodyEl = document.querySelector("#body");

// Add fontawesome cdn
var link = document.createElement("link");
link.href = "https://use.fontawesome.com/releases/v5.8.1/css/all.css";
link.rel = "stylesheet";
document.head.appendChild(link);

let name = "DB - Test";
let columns = ["Data Id", "Base"];
let data = [{ id: "1", dataid: "hi", base: "hallo" }];

nameEl.textContent = name;

columns.forEach((column) => {
  var th = document.createElement("th");
  th.scope = "col";
  th.textContent = column;
  columnsEl.appendChild(th);
});

data.forEach((row) => {
  var tr = document.createElement("tr");
  tr.id = row.id;

  var th = document.createElement("th");
  th.scope = "row";
  th.textContent = row.id;
  tr.appendChild(th);

  // Loop through the row and create a td for each column
  columns.forEach((column) => {
    var td = document.createElement("td");
    td.textContent = row[column];

    tr.appendChild(td);
  });

  bodyEl.appendChild(tr);
});

function edit(row) {
  // Loop through all cells in the row
  for (var i = 0; i < row.cells.length; i++) {
    // If the cell is not the first one, make it editable
    if (i != 0) {
      if (!row.cells[i].hasAttribute("contenteditable")) {
        row.cells[i].setAttribute("contenteditable", "true");
      } else {
        row.cells[i].removeAttribute("contenteditable");
      }
    }
  }
}

// Make a function to export the table to a dictionary
function exportTableToDictionary() {
  var table = {};
  // Loop through all rows
  for (var i = 0; i < bodyEls.length; i++) {
    var row = bodyEls[i];
    // Create a new row
    var newRow = {};
    // Loop through all cells in the row
    for (var j = 0; j < row.cells.length; j++) {
      // Get the column name
      var columnName = columns[j - 1];
      if (j == 0) {
        columnName = "id";
      }
      // Get the cell value
      var cellValue = row.cells[j].textContent;
      // Add the column name and value to the new row
      newRow[columnName] = cellValue;
    }
    // Add the new row to the table
    table[newRow.id] = newRow;
  }
  return table;
}

//   Loop through all the rows in the table
//   and add a button to edit the text
//   of the first cell of each row
//   and add a button to delete the row
//   and add a button to add a new row
//   and add a button to save the changes
//   and add a button to cancel the changes
//   and add a button to delete the table

function createEdit(buttons, row) {
  var button = document.createElement("button");
  button.className = "btn btn-primary";
  button.innerHTML = "<i class='fas fa-edit'></i> Edit";
  button.onclick = function () {
    edit(row);
  };
  buttons.appendChild(button);
}

function createDelete(buttons, row) {
  var button = document.createElement("button");
  button.className = "btn btn-danger";
  button.innerHTML = "<i class='fas fa-trash-alt'></i> Delete";
  button.onclick = function () {
    row.parentNode.removeChild(row);
  };
  buttons.appendChild(button);
}

var bodyEls = [...body.children];
bodyEls.forEach((row) => {
  // Create a div called buttons
  var buttons = document.createElement("div");
  buttons.className = "buttons";

  createEdit(buttons, row);
  createDelete(buttons, row);

  // Dont take up much space
  buttons.style.width = "34%";
  row.appendChild(buttons);
});

// Add a button to add a new row
var addButton = document.createElement("button");
addButton.className = "btn btn-success";
addButton.innerHTML = "<i class='fas fa-plus'></i> Add Row";
addButton.onclick = function () {
  // Create a new row
  var row = document.createElement("tr");
  // Create a new cell for the id
  var cell = document.createElement("td");
  //   Create a id by adding one to the last index of the table
  var id = bodyEls.length + 1;
  cell.textContent = id;
  cell.scope = "row";
  row.appendChild(cell);
  // Loop through the columns
  columns.forEach((column) => {
    // Create a new cell
    var cell = document.createElement("td");
    // Add the cell to the row
    cell.textContent = column;

    row.appendChild(cell);
  });

  // Create a div called buttons
  var buttons = document.createElement("div");
  buttons.className = "buttons";

  createEdit(buttons, row);
  createDelete(buttons, row);

  // Dont take up much space
  buttons.style.width = "34%";
  row.appendChild(buttons);

  //   Edit body el list
  bodyEls.push(row);

  // Add the row to the table
  body.appendChild(row);

  //   Call edit on the row
  edit(row);
};
document.querySelector("table").appendChild(addButton);

// Create a save button
var saveButton = document.createElement("button");
saveButton.className = "btn btn-success";
saveButton.style.float = "right";
saveButton.innerHTML = "<i class='fas fa-save'></i> Save";
saveButton.onclick = function () {
  // Export the table to a dictionary
  var table = exportTableToDictionary();
  // Convert the dict to a list
  var list = Object.values(table); 
  //   Convert the dictionary to JSON
  var json = JSON.stringify(table);
  //   Save the JSON or List to local storage or send it to the server
  console.log(json, list);
};
document.querySelector("table").appendChild(saveButton);
