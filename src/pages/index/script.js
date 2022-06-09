import {AppController} from "../../controller/app-controller.js";

const url = "https://green-json-server.herokuapp.com/online-shop";

const line = document.querySelector(".line");
const appController = new AppController(line, "page");

appController.initiate(url).catch(err => console.log(err));
