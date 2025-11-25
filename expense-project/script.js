const addBtn = document.getElementById("openForm");
const form = document.getElementById("form");
const tableBody = document.querySelector("tbody");
const totalText = document.getElementById("total");
const categoryFilter = document.getElementById("categoryFilter");

let expenses = [];
let selectedCategory = ""; 

addBtn.onclick = () => {
  form.classList.toggle("hidden");
};

form.onsubmit = function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  const expense = {
    id: Math.random(),
    title,
    amount: Number(amount),
    category,
    date,
  };

  expenses.push(expense);
  render();

  form.reset();
  form.classList.add("hidden");
};

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  render();
}


categoryFilter.onchange = function () {
  selectedCategory = this.value; 
  render();
};

function render() {
  tableBody.innerHTML = "";

  const categories = [
    ...new Set(
      expenses
        .map((exp) => exp.category)
    ),
  ];

  const prevSelected = selectedCategory;
  
  categoryFilter.innerHTML = categories
    .map(
      (cat) =>
        `<option value="${cat}" ${
          cat === prevSelected ? "selected" : ""
        }>${cat}</option>`
    )
    .join("");

  const visibleExpenses = selectedCategory
    ? expenses.filter((exp) => exp.category === selectedCategory)
    : expenses; 

  visibleExpenses.forEach((exp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exp.title}</td>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>${exp.date}</td>
      <td>
        <button class="delete-btn" data-id="${exp.id}">Delete</button>
      </td>
    `;

    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteExpense(exp.id));
    tableBody.appendChild(row);
  });

  const total = visibleExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalText.innerText = "Total: " + total;
}
