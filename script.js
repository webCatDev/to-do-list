const input = document.getElementById("input");
const toDoListElement = document.getElementById("to-do-list");
const letterCount = document.getElementById("letter-count");
const letterCountWrapper = document.getElementById("letter-wrapper");
const areYouSureDialog = document.getElementById("are-you-sure");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const deleteButtons = document.getElementsByClassName("delete");
const doneButtons = document.getElementsByClassName("done");

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));

// Functions
function createListItem(text) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span class="text">${text}</span
            ><span class="button-wrapper"
              ><i class="fa-solid fa-trash delete"></i
              ><i class="fa-solid fa-clipboard-check done"></i
            ></span>
            `;
  toDoListElement.appendChild(listItem);
}

function renderList(){
  itemsArray.forEach(element => {
    createListItem(element)
  });
}

function checkInputLength() {
  if (input.value.length >= 14 && input.value.length <= 19) {
    letterCountWrapper.classList.add("warning");
    letterCountWrapper.classList.remove("stop");
  } else if (input.value.length === 20) {
    letterCountWrapper.classList.remove("warning");

    letterCountWrapper.classList.add("stop");
  } else {
    letterCountWrapper.classList.remove("warning");
    letterCountWrapper.classList.remove("stop");
  }
}

//Functions end

renderList()
var max = 20;

input.addEventListener("input", () => {
  input.value = input.value.replace(/[><]/g, "");
});

input.addEventListener("keyup", function (event) {
  event.target.value = event.target.value.substring(0, max);
});

input.addEventListener("keydown", (event) => {
  letterCount.textContent = input.value.length;
  checkInputLength();

  if (event.key === "Enter" && input.value.trim() !== "") {
    letterCount.textContent = "0";
    letterCountWrapper.classList.remove("warning");
    letterCountWrapper.classList.remove("stop");

    itemsArray.push(input.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));

    createListItem(input.value);
    input.value = "";
  }
});

toDoListElement.addEventListener("mouseover", () => {
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", () => {
      areYouSureDialog.classList.add("show");
      yesButton.addEventListener("click", () => {
        const index=[...deleteButtons].indexOf(deleteButton)
        console.log(index)
        itemsArray.splice(
          itemsArray[index],
          1
        );
        
        localStorage.setItem("items", JSON.stringify(itemsArray));
        areYouSureDialog.classList.remove("show");
        deleteButton.parentElement.parentElement.remove();
      });
    });
  }
});

noButton.addEventListener("click", () => {
  areYouSureDialog.classList.remove("show");
});

toDoListElement.addEventListener("mouseover", () => {
  for (const doneButton of doneButtons) {
    doneButton.addEventListener("click", () => {
      doneButton.parentElement.previousElementSibling.classList.toggle(
        "finished"
      );
    });
  }
});
