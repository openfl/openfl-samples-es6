import { Sprite, Stage } from "openfl";

class App extends Sprite {
  constructor() {
    super();
    console.log("Hello World!");
  }
}

var stage = new Stage(550, 400, 0xffffff, App);
document.getElementById("app").appendChild(stage.element);