import { Loader, Sprite, Stage, URLRequest } from "openfl";
import iconPath from "../icon.png";

class App extends Sprite {
  constructor() {
    super();
    var icon = new Loader();
    icon.load(new URLRequest(iconPath));
    this.addChild(icon);
  }
}

var stage = new Stage(550, 400, 0xffffff, App);
var element = document.getElementById("app");
while (element.lastChild) element.removeChild(element.lastChild);
element.appendChild(stage.element);