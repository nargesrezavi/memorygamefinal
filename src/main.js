// dom nodes
let boxes = [...document.querySelectorAll(".box")];
const container = document.querySelector(".container");
const winModal = document.querySelector(".my-modal")
const winModalBtn = document.querySelector(".resetBtn")
const correctAttempt = document.querySelector(".correctAttempt")
const wrongAttempt = document.querySelector(".wrongAttempt")


let selectedBoxes = [];

let matchedCounter = 0;

shuffleBoxes();
setNewOrder();
// functions
function setNewOrder() {
  container.innerHTML = "";
  for (const box of boxes) {
    // console.log(box.outerHTML);
    container.innerHTML += box.outerHTML;
  }

  boxes = [...document.querySelectorAll(".box")];
}

function hideAll() {
  for (const box of boxes) {
    box.classList.add("hide-content");
  }
}

function shuffleBoxes() {
  for (let i = 0; i < boxes.length; i++) {
    const randomIndex = Math.floor(Math.random() * boxes.length);

    const targetVal = boxes[randomIndex];
    boxes[randomIndex] = boxes[i];
    boxes[i] = targetVal;
  }
}

function handleBoxClick(event) {
  if (selectedBoxes.length === 0) {
    selectedBoxes.push(event.target);
    event.target.classList.remove("hide-content");
    selectedBoxes[0].classList.add("freeze-box");
  } else {
    selectedBoxes.push(event.target);
    selectedBoxes[1].classList.add("freeze-box");
    selectedBoxes[1].classList.remove("hide-content");
    if (selectedBoxes[0].innerHTML === selectedBoxes[1].innerHTML) {
      matchedCards();
    } else {
      unmatchedCards();
    }
  }
}

function unmatchedCards() {
  selectedBoxes[0].style = "background-color: red";
  selectedBoxes[1].style = "background-color: red";

  setTimeout(function () {
    selectedBoxes[0].classList.add("hide-content");
    selectedBoxes[1].classList.add("hide-content");
    selectedBoxes[0].classList.remove("freeze-box");
    selectedBoxes[1].classList.remove("freeze-box");
    selectedBoxes[0].style = "";
    selectedBoxes[1].style = "";
    selectedBoxes = [];
  }, 2000);
}


function win(event) {
  // document.body.style = `background-color:yellow`;
  //   document.body.textContent = "";
  //   document.body.style = `background-image:url(./images/win.jpg)`;
  //  document.body.classList.add("win");

  winModal.classList.remove("hidden");
  winModal.classList.add("flex");
}


function matchedCards() {
  selectedBoxes[0].classList.remove("hide-content");
  selectedBoxes[1].classList.remove("hide-content");
  selectedBoxes[0].classList.add("matched");
  selectedBoxes[1].classList.add("matched");
  selectedBoxes.length = 0;

  matchedCounter++;

  setTimeout(() => {
    if (matchedCounter === 8) {

      win();

    }
  }, 5);
}
setTimeout(hideAll, 2000);



// events

for (const box of boxes) {
  box.addEventListener("click", handleBoxClick);
}

winModalBtn.addEventListener("click", () => { window.location.reload() })
