import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

const app = new PIXI.Application({
  backgroundColor: 0x00ffffff,
  width: 460,
  height: 230,
});
document.body.appendChild(app.view);

app.loader
  .add("axie", "static/axie.json", { metadata: { spineSkeletonScale: 0.5 } })
  .add("axie2", "static/axie2.json", { metadata: { spineSkeletonScale: 0.5 } })
  .load((_, res) => {
    const axie = new Spine(res.axie.spineData);
    const axie2 = new Spine(res.axie2.spineData);

    console.log(res);

    app.screen.width = 460;
    app.screen.height = 230;
    axie.x = app.screen.width / 4;
    axie.y = app.screen.height / 1.2;
    axie2.x = app.screen.width / 1.4;
    axie2.y = app.screen.height / 1.2;

    axie.scale.set(0.5);
    axie2.scale.set(0.5);

    app.stage.addChild(axie);
    app.stage.addChild(axie2);

    if (axie.state.hasAnimation("action/idle")) {
      axie.state.setAnimation(0, "action/idle", true);
      axie.state.timeScale = 1;
      axie2.state.setAnimation(0, "action/idle", true);
      axie2.state.timeScale = 1;
    }

    app.start();
  });
