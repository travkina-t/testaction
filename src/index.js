import "./style.css";
import picture from "./images/goblin.png";

let timerId;

class Game {
  constructor(containerSelector) {
    this.success = 0;
    this.errors = 0;
    this.blocksContainer = document.querySelector(containerSelector);
    if (!this.blocksContainer) {
      this.blocksContainer = document.createElement("div");
      this.blocksContainer.classList.add("container");
      document.body.appendChild(this.blocksContainer);
    }
    this.lastIndex = -1;
    this.blocks = [];
  }
  renderBlocks() {
    for (let i = 0; i < 16; i += 1) {
      const div = document.createElement("div");
      div.classList.add("block");
      this.blocks.push(div);
      this.blocksContainer.append(div);
    }
  }
  getRandomIndex() {
    let number;
    do {
      number = Math.floor(Math.random() * 16);
    } while (number === this.lastIndex);
    {
      this.lastIndex = number;
      return number;
    }
  }
  startGame(pic = picture) {
    const randomIndex = this.getRandomIndex();
    // const html = `<img class="picture" src="${picture}">`;
    const html = document.createElement("img");
    html.setAttribute("src", `${pic}`);
    html.setAttribute("class", `picture`);
    html.setAttribute("alt", `picture`);
    for (let i = 0; i < this.blocks.length; i += 1) {
      this.blocks[i].innerHTML = "";
    }
    this.blocks[randomIndex].insertAdjacentElement("afterbegin", html);
  }
  clickOnBlocks() {
    const textSuccess = document.querySelector(".success");
    const textErrors = document.querySelector(".errors");
    const message = document.querySelector(".message");
    for (let i = 0; i < this.blocks.length; i = i + 1) {
      this.blocks[i].addEventListener("click", (event) => {
        // console.log(event.target)
        if (event.target.classList.contains("picture")) {
          if (this.errors < 5) {
            this.success = this.success + 1;
            textSuccess.innerHTML = this.success;
            event.target.remove();
          }
        } else {
          if (this.errors < 5) {
            this.errors = this.errors + 1;
            textErrors.innerHTML = textErrors.innerHTML - 1;
          } else {
            message.innerHTML = "Game Over";
            clearInterval(timerId);
          }
        }
      });
    }
  }
}

const game = new Game(".container");
game.renderBlocks();
game.startGame();
game.clickOnBlocks();
timerId = setInterval(() => {
  game.startGame();
}, 1000);

export { Game };
