import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

const app = new PIXI.Application({
  backgroundColor: 0x00ffffff,
  width: 230,
  height: 230,
});
document.body.appendChild(app.view);

app.loader
  .add("axie", "static/axie.json", { metadata: { spineSkeletonScale: 0.5 } })
  .load((_, res) => {
    const axie = new Spine(res.axie.spineData);

    app.screen.width = 230;
    app.screen.height = 230;
    axie.x = app.screen.width / 2.2;
    axie.y = app.screen.height / 1.2;

    axie.scale.set(0.5);

    app.stage.addChild(axie);

    if (axie.state.hasAnimation("action/idle")) {
      axie.state.setAnimation(0, "action/idle", true);
      axie.state.timeScale = 1.5;
    }

    app.start();
  });
