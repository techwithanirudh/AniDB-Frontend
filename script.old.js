const nameEl = document.querySelector("#dbname");
const columnsEl = document.querySelector("#columns");
const bodyEl = document.querySelector("#body");

// Add fontawesome cdn
var link = document.createElement("link");
link.href = "https://use.fontawesome.com/releases/v5.8.1/css/all.css";
link.rel = "stylesheet";
document.head.appendChild(link);

const database = "test";
var name = "Test1";
var columns = [];
fetch(
  "https://anidd-backend.techwithanirudh.repl.co/api/v1/create/" + database,
  {
    method: "POST",
  }
);
fetch(
  "https://AniDB-Backend.techwithanirudh.repl.co/api/v1/get/" +
    database +
    "/" +
    name
)
  .then((response) => response.json())
  .then((json) => {
    main(json);
  });

function main(data) {
  try {
    data.forEach((row) => {});
  } catch {
    data = [];
  }

  console.log(data);

  nameEl.textContent = name;

  if (typeof data[0] === "object") {
    columns = Object.keys(data[0]);
  }

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
    // Check if cells exist
    if (!row.cells) {
      if (!row.hasAttribute("contenteditable")) {
        row.setAttribute("contenteditable", "true");
      } else {
        row.removeAttribute("contenteditable");
      }
    }
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
  function exportTableToDictionary(bodyEls, includes = false) {
    var table = {};
    var count = 0
    bodyEls.forEach((bodyEl) => {
      var row = {};
      count += 1
      bodyEl.querySelectorAll("td").forEach((cell) => {
        row[cell.textContent] = cell.textContent;
      });
      //   Get the columnName by doing columns in the table
      columnName = columns[count - 1];
      table[columnName] = row;
    });
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
    button.innerHTML = "<i class='fas fa-edit'></i>";
	button.title = 'Edit'
    button.onclick = function () {
      edit(row);
    };
    buttons.appendChild(button);
  }

  function createDelete(buttons, row) {
    var button = document.createElement("button");
    button.className = "btn btn-danger";
    button.innerHTML = "<i class='fas fa-trash-alt'></i>";
	button.title = 'Delete'
    button.onclick = function () {
      row.parentNode.removeChild(row);
      bodyEls = [...body.children];
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
    row.setAttribute("data-anidb-include", "true");
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
    // reset bodyEls
    bodyEls = [...body.children];
    // Export the table to a dictionary
    var table = exportTableToDictionary(bodyEls);
    // Convert the dict to a list
    var list = Object.values(table);
    //   Convert the dictionary to JSON
    var json = JSON.stringify(table);
    //   Save the JSON or List to local storage or send it to the server
    (async () => {
      console.log(list);
      const rawResponse = await fetch(
        "https://anidb-backend.techwithanirudh.repl.co/api/v1/create/" +
          database +
          "/" +
          name,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: list }),
        }
      );
      const content = await rawResponse.text();

      alert(content);
    })();
  };

  // Add a button to add a column
  var addColumnButton = document.createElement("button");
  addColumnButton.className = "btn btn-success";
  addColumnButton.innerHTML = "<i class='fas fa-plus'></i> Add Column";
  addColumnButton.onclick = function () {
    //   Create a div called buttons
    var buttons = document.createElement("div");
    buttons.className = "buttons";
    // Create a new column
    var column = document.createElement("th");
    column.appendChild(buttons);
    // Add the column text
    column.insertAdjacentText("beforeend", "New Column");
    // Add the column to the columns list
    columns.push("New Column");
    // Add the column to the table
    columnsEl.appendChild(column);
    // Add a new cell to each row
    bodyEls.forEach((row) => {
      var cell = document.createElement("td");
      cell.textContent = "New Column";
      //   Insert the cell before the buttons
      row.insertBefore(cell, row.lastChild);
    });

    //   Add an edit button to the new column
    var editButton = document.createElement("button");
    editButton.className = "btn btn-primary";
    editButton.innerHTML = "<i class='fas fa-edit'></i>";
	deleteButton.title = "Edit"
    editButton.onclick = function () {
      edit(column);
      //   Edit the column in the columns list
      columns[columns.at(-1)] = column.textContent;
    };
    buttons.appendChild(editButton);
    // Add a delete button to the new column
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
	deleteButton.title = "Delete"
    deleteButton.onclick = function () {
      column.parentNode.removeChild(column);
      bodyEls.forEach((row) => {
        // Remove the child before the buttons
        row.removeChild(row.querySelector(".buttons").previousSibling);
      });
      columns.pop();
      bodyEls = [...body.children];
    };
    buttons.appendChild(deleteButton);
  };
  document.querySelector("table").appendChild(addColumnButton);
  document.querySelector("table").appendChild(saveButton);
}
