const EMOJIS = ["🍕", "🍔", "🌮", "🍣", "🍩", "🍓", "🥑", "🍦"];
const FLIP_BACK_DELAY = 800;

const board = document.getElementById("board");
const restartButton = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let locked = false;
let flipBackTimer = null;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  board.innerHTML = "";
  const deck = shuffle([...EMOJIS, ...EMOJIS]);
  for (const emoji of deck) {
    const card = document.createElement("button");
    card.className = "card";
    card.dataset.emoji = emoji;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  }
}

function flipCard(card) {
  if (locked) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.emoji;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
  } else {
    locked = true;
    flipBackTimer = setTimeout(() => {
      for (const card of [firstCard, secondCard]) {
        card.classList.remove("flipped");
        card.textContent = "";
      }
      resetTurn();
    }, FLIP_BACK_DELAY);
  }
}

function resetTurn() {
  clearTimeout(flipBackTimer);
  flipBackTimer = null;
  firstCard = null;
  secondCard = null;
  locked = false;
}

restartButton.addEventListener("click", () => {
  resetTurn();
  createBoard();
});

createBoard();
