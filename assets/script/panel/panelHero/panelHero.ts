import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    panelLayer: cc.Node = null;
    // onLoad () {}


    start() {
        Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
    }

    // update (dt) {}
}
