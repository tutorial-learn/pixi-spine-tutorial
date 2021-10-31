import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader.add("spineboy-pro", "static/spineboy-pro.json").load((_, res) => {
  const spineBoyPro = new Spine(res["spineboy-pro"].spineData);

  spineBoyPro.x = app.screen.width / 2;
  spineBoyPro.y = app.screen.height;

  spineBoyPro.scale.set(0.5);

  app.stage.addChild(spineBoyPro);

  if (spineBoyPro.state.hasAnimation("run")) {
    // run forever, little boy!
    spineBoyPro.state.setAnimation(0, "run", true);
    // dont run too fast
    spineBoyPro.state.timeScale = 1;
  }

  app.start();
});
