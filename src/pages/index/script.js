import { RenderPosition } from "../../helpers/render";

import { PreloaderController } from "../../controller/preloader-controller";
import { AppController } from "../../controller/app-controller";

const url = "https://green-json-server.herokuapp.com/online-shop";

const line = document.querySelector(".line");
const preloaderController = new PreloaderController(document.body, {parent: "page"});
const appController = new AppController(line, {parent: "page"}, RenderPosition.AFTER);

preloaderController.initiate();
appController.initiate(url).catch(err => console.log(err));
