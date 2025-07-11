import { handleExpenseForm } from "./expensesTracker.controller.js";
$(document).ready(() => {
  handleExpenseForm();

  if ($("#category").val() !== "Others") {
    $("#miscField").hide();
  }
  $("#category").on("change", function () {
    if ($(this).val() === "Others") {
      $("#miscField").show();
    } else {
      $("#miscField").hide();
    }
  });

const dateInput = document.getElementById("date");
const form = document.getElementById("expenseForm");

const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);
today.setHours(0, 0, 0, 0);
thirtyDaysAgo.setHours(0, 0, 0, 0);

function formatToLocalDatetime(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

dateInput.min = formatToLocalDatetime(thirtyDaysAgo);
dateInput.max = formatToLocalDatetime(today);
dateInput.value = formatToLocalDatetime(today);

dateInput.addEventListener("change", () => {
  const selectedDate = new Date(dateInput.value);
  selectedDate.setSeconds(0, 0);

  if (selectedDate < thirtyDaysAgo) {
    dateInput.setCustomValidity("Date cannot be older than 30 days ago.");
  } else if (selectedDate > today) {
    dateInput.setCustomValidity("Date cannot be in the future.");
  } else {
    dateInput.setCustomValidity("");
  }
  dateInput.reportValidity();
});

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    dateInput.reportValidity();
  }
});


})

