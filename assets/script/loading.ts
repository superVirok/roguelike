import { Res } from "./lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    start() {
        Res.loadRes();
        this.scheduleOnce(() => {
            cc.director.loadScene("main");
        }, 1)
    }

    // update (dt) {}
}
