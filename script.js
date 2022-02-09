const input = document.getElementById("input");
const toDoListElement = document.getElementById("to-do-list");
const letterCount = document.getElementById("letter-count");
const letterWrapper = document.getElementById("letter-wrapper");
const areYouSureDialog = document.getElementById("are-you-sure");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const deleteButtons= document.getElementsByClassName("delete")
const doneButtons = document.getElementsByClassName("done");

var max = 20;

input.addEventListener("keyup", function (event) {
  event.target.value = event.target.value.substring(0, max);
});

input.addEventListener("keydown", (event) => {
  letterCount.textContent = input.value.length;

  if (input.value.length >= 14 && input.value.length <= 19) {
    letterWrapper.classList.add("warning");
    letterWrapper.classList.remove("stop");
  } else if (input.value.length === 20) {
    letterWrapper.classList.remove("warning");

    letterWrapper.classList.add("stop");
  } else {
    letterWrapper.classList.remove("warning");
  }

  if (event.key === "Enter" && input.value.trim() !== "") {
        letterCount.textContent = "0";

    const listItem = document.createElement("li");
    listItem.innerHTML = `<span class="text">${input.value}</span
            ><span class="button-wrapper"
              ><i class="fa-solid fa-trash delete"></i
              ><i class="fa-solid fa-clipboard-check done"></i
            ></span>
            `;
    input.value = "";

    toDoListElement.appendChild(listItem);
  }

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", () => {
        areYouSureDialog.classList.add("show")
        yesButton.addEventListener("click", ()=>{
            areYouSureDialog.classList.remove("show")
            deleteButton.parentElement.parentElement.remove();
        })

        noButton.addEventListener("click", () => {
          areYouSureDialog.classList.remove("show");
        });
    });
  }

   for (const doneButton of doneButtons) {

doneButton.addEventListener("click", () => {
    doneButton.parentElement.previousElementSibling.classList.toggle("finished")
})

   }
});


