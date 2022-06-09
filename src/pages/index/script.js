import {AppController} from "../../controller/app-controller.js";

const line = document.querySelector(".line");
const appController = new AppController(line, "page");

appController.initiate();
