const modal = document.getElementById("modal");
const form = document.getElementById("table");
let currentTable = null;
const button = document.getElementById("save");
let number = document.getElementById("number");
let description = document.getElementById("description");
let date = document.getElementById("date");
let selectStatus = document.getElementById("status");
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let offset = (currentPage - 1) * ITEMS_PER_PAGE;
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
  document.getElementById("number").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
  document.getElementById("status").value = "";
};

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const checkFields = () => {
  if (number.value === "") {
    button.disabled = true;
    button.classList.remove("btn-modal-active");
  } else if (description.value === "") {
    button.disabled = true;
    button.classList.remove("btn-modal-active");
  } else if (date.value === "") {
    button.disabled = true;
    button.classList.remove("btn-modal-active");
  } else if (selectStatus.value === "") {
    button.disabled = true;
    button.classList.remove("btn-modal-active");
  } else {
    button.removeAttribute("disabled");
    button.classList.add("btn-modal-active");
  }
};

const newTable = async () => {
  const apiResponse = await fetch(
    `http://localhost:3000/tables?_start=${offset}&_limit=${ITEMS_PER_PAGE}`
  );
  const tables = await apiResponse.json();
  const tablesContent = document.getElementById("table-body");
  tablesContent.innerHTML = "";

  tables.forEach((table) => {
    const date = new Date(table.date);
    tablesContent.innerHTML =
      tablesContent.innerHTML +
      `
                        <tr class="description-color">
                            <th scope="row">${table.number}</th>
                            <td>${table.description}</td>
                            <td>${date.toLocaleDateString("pt-BR")}</td>
                            <td class="status ${table.status.replace(
                              " ",
                              "-"
                            )}">${table.status}</td>
                            <td>
                                <button type="button" onclick="editTable(${
                                  table.id
                                })" class="btn-img"><img src="../img/editar.svg" /></button>
                                <button type="button" onclick="deleteTable(${
                                  table.id
                                })" class="btn-img"><img src="../img/excluir.svg" class="pl" /></button>
                            </td>
                        </tr>
        `;
  });
  checkNextBtn(tables.length);
};

const checkPrevBtn = () => {
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
};

const checkNextBtn = (length) => {
  if (length === 0) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
};

prevBtn.addEventListener("click", () => {
  currentPage--;
  offset = (currentPage - 1) * ITEMS_PER_PAGE;
  newTable();
  checkPrevBtn();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  offset = (currentPage - 1) * ITEMS_PER_PAGE;
  newTable();
  checkPrevBtn();
});

const getTable = async (id) => {
  const apiResponse = await fetch(`http://localhost:3000/tables/${id}`);
  const table = await apiResponse.json();
  return table;
};

const createTable = async (table) => {
  await fetch("http://localhost:3000/tables", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(table),
  });
};

const updateTable = async (id, table) => {
  await fetch(`http://localhost:3000/tables/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(table),
  });
};

const deleteTable = async (id) => {
  await fetch(`http://localhost:3000/tables/${id}`, {
    method: "DELETE",
  });
  newTable();
};

const saveTable = async (table) => {
  if (currentTable === null) {
    await createTable(table);
  } else {
    await updateTable(currentTable.id, table);
    currentTable = null;
  }
  closeModal();
  newTable();
};

const editTable = async (id) => {
  currentTable = await getTable(id);
  document.getElementById("number").value = currentTable.number;
  document.getElementById("description").value = currentTable.description;
  document.getElementById("date").value = currentTable.date;
  document.getElementById("status").value = currentTable.status;

  openModal();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const number = form.elements["number"].value;
  const description = form.elements["description"].value;
  const date = form.elements["date"].value;
  const status = form.elements["status"].value;

  console.log(number, description, date, status);
  const table = {
    number,
    description,
    date,
    status,
  };
  saveTable(table);
});

checkPrevBtn();
