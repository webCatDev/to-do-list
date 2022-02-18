const input = document.getElementById("input");
const toDoListElement = document.getElementById("to-do-list");
const settingsButton = document.getElementById("settings-button");
const settingsList = document.getElementById("settings-list");
const muteButton = document.getElementById("mute");
const muteIcon = document.getElementById("mute-icon");
const letterCount = document.getElementById("letter-count");
const letterCountWrapper = document.getElementById("letter-wrapper");
const areYouSureDialog = document.getElementById("are-you-sure");
const areYouSureText = document.getElementById("are-you-sure-text");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const deleteButtons = document.getElementsByClassName("delete");
const doneButtons = document.getElementsByClassName("done");
const listText = document.getElementsByClassName("text");

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));

settingsButton.addEventListener("click", () => {
  settingsButton.classList.toggle("active");
  settingsList.classList.toggle("active");
});



  if (!localStorage.getItem("unmute")) {
    localStorage.setItem("unmute", true);
  }

  


muteButton.addEventListener("click", () => {


  if (JSON.parse(localStorage.getItem("unmute"))) {
    muteButton.innerHTML = `<i class="fa-solid fa-volume-high sound-icon" id="mute-icon"></i>Sesi aç`;
    document.getElementById("draw").muted = true;
    document.getElementById("erase").muted = true;
    document.getElementById("remove").muted = true;
    localStorage.setItem("unmute", false);
  } else {
    muteButton.innerHTML = `<i class="fa-solid fa-volume-xmark sound-icon" id="mute-icon"></i>Sesi kapa`;
    document.getElementById("draw").muted = false;
    document.getElementById("erase").muted = false;
    document.getElementById("remove").muted = false;
    localStorage.setItem("unmute", true);
  }
});

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

function lineThrough() {
  for (const doneButton of doneButtons) {
    const index = [...doneButtons].indexOf(doneButton);

    doneButton.addEventListener("click", () => {
      if (!itemsArray[index].lineThrough) {
        doneButton.parentElement.previousElementSibling.classList.add(
          "finished"
        );
        document.getElementById("draw").play();

        itemsArray[index].lineThrough = true;
        localStorage.setItem("items", JSON.stringify(itemsArray));
      } else {
        doneButton.parentElement.previousElementSibling.classList.remove(
          "finished"
        );
        document.getElementById("erase").play();
        itemsArray[index].lineThrough = false;
        localStorage.setItem("items", JSON.stringify(itemsArray));
      }
    });
  }
}

function renderList() {
  itemsArray.forEach((element, index) => {
    createListItem(element.text);
    if (element.lineThrough) {
      listText[index].classList.add("finished");
    }
  });
  lineThrough();
}

function checkInputLength() {
      const count=Number(letterCount.textContent)
    if (count >= 14 && count <= 19) {
      letterCountWrapper.classList.add("warning");
      letterCountWrapper.classList.remove("stop");
    } else if (count === 20) {
      letterCountWrapper.classList.remove("warning");

      letterCountWrapper.classList.add("stop");
    }
    else {
      letterCountWrapper.classList.remove("warning");
      letterCountWrapper.classList.remove("stop");
    }

     if (count > 0) {
       document.getElementById("wrapper").classList.add("active");
     } else {
       document.getElementById("wrapper").classList.remove("active");
     }
}

//Functions end

renderList();
var max = 20;

input.addEventListener("input", () => {
  letterCount.textContent = input.value.length;
  input.value = input.value.slice(0, max);
  input.value = input.value.replace(/[><]/g, "");
});



input.addEventListener("keydown", (event) => {
  
  checkInputLength();

  if (event.key === "Enter" && input.value.trim() !== "") {
    letterCount.textContent = "0";
    letterCountWrapper.classList.remove("warning");
    letterCountWrapper.classList.remove("stop");
    document.getElementById("wrapper").classList.remove("active");


    itemsArray.push({ text: input.value, lineThrough: false });
    localStorage.setItem("items", JSON.stringify(itemsArray));
    toDoListElement.innerHTML = "";
    renderList();
    input.value = "";
  }
});

// Elemanı silme
toDoListElement.addEventListener("mouseover", () => {
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", () => {
      areYouSureText.textContent =
        deleteButton.parentElement.previousElementSibling.textContent;
      areYouSureDialog.classList.add("show");

      yesButton.addEventListener("click", () => {
        const index = [...deleteButtons].indexOf(deleteButton);
        if (index > -1) {
          itemsArray.splice(index, 1);
        }

        localStorage.setItem("items", JSON.stringify(itemsArray));
        document.getElementById("remove").play();
        areYouSureDialog.classList.remove("show");
        deleteButton.parentElement.parentElement.remove();
      });
    });
  }
});

noButton.addEventListener("click", () => {
  areYouSureDialog.classList.remove("show");
});
