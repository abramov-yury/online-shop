import { RenderPosition } from "../../helpers/render";

import { PreloaderController } from "../../controller/preloader-controller";
import { AppController } from "../../controller/app-controller";

const url = "https://api.jsonbin.io/v3/b/639b205915ab31599e1d02f8";
const oldUrl = "https://green-json-server.herokuapp.com/online-shop";


const line = document.querySelector(".line");
const preloaderController = new PreloaderController(document.body, {parent: "page"});
const appController = new AppController(line, {parent: "page"}, RenderPosition.AFTER);

preloaderController.initiate();
appController.initiate(url);
