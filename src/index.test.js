import { Game } from "./index.js";
import { jest } from "@jest/globals";

describe("class game", () => {
  //создали глобальные переменные для игры, для контейнера и для отображения количества успешных кликов и ошибок, для отображения сообщения об окончании игры
  let game;
  let container;
  let successEl;
  let errorsEl;
  let messageEl;
  //перед запуском каждого теста создаем контейнер, отображение очков и пустой див для сообщения об окончании игры
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container"></div>
      <div class="success">0</div>
      <div class="errors">0</div>
      <div class="message"></div>
    `;
    //создаем экземпляр класса game и получаем доступ к html элементам
    game = new Game(".container");
    container = document.querySelector(".container");

    successEl = document.querySelector(".success");
    errorsEl = document.querySelector(".errors");
    messageEl = document.querySelector(".message");
  });

  test("количество блоков - должно быть 16", () => {
    game.renderBlocks();
    expect(document.querySelectorAll(".block").length).toBe(16);
  });
  test("индекс должен быть от 0 до 15", () => {
    expect(game.getRandomIndex()).toBeGreaterThanOrEqual(0);
    expect(game.getRandomIndex()).toBeLessThanOrEqual(15);
  });
  test("наличие картинки после начала игры", () => {
    game.renderBlocks();
    game.startGame("./images/goblin.png");
    expect(document.querySelector("img")).not.toBeNull(); // ожидаем что картинка отрисовалась
  });
  test("успешный клик на картинку", () => {
    game.renderBlocks();
    game.startGame("test.png");
    game.clickOnBlocks();
    const picture = container.querySelector(".picture");
    //клик по картинке
    picture.click();
    //ожидаем что счет увеличится и что это отобразится в интерфейсе
    expect(game.success).toBe(1);
    expect(successEl.textContent).toBe("1"); // textContent = innerHTML
  });

  test("неуспешный клик на картинку", () => {
    game.renderBlocks();
    game.startGame("test.png");
    game.clickOnBlocks();
    // клик по блоку без картинки
    //получаем все блоки и берем из них первый из блоков, в котором не отрисовалась картинка
    const emptyBlock = [...container.querySelectorAll(".block")].find(
      (block) => !block.querySelector("img"),
    );
    //кликаем по этому блоку
    emptyBlock.click();
    //проверяем что ошибка появилась и отрисовалась
    expect(game.errors).toBe(1);
    expect(errorsEl.textContent).toBe("-1");
  });

  test("окончание игры после 5 ошибок", () => {
    game.renderBlocks();
    game.startGame("test.png");
    game.clickOnBlocks();
    // ошибки до 5
    game.errors = 5;
    const emptyBlock = [...container.querySelectorAll(".block")].find(
      (block) => !block.querySelector("img"),
    );
    jest.useFakeTimers(); //возможность создавать ненастоящий таймер в jest при тестировании не нужно ждать пока таймер отработает
    global.timerId = setInterval(() => {
      game.startGame();
    }, 1000);
    emptyBlock.click();
    expect(messageEl.textContent).toBe("Game Over"); //проверяем, что в конце будет надпись об окончании игры
  });
  // });
}); // оптимизировали код будет делаться перед каждым тестом
