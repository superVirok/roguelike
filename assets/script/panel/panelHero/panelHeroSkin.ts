import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    panelLayer: cc.Node = null;

    onBack() {
        this.panelLayer = this.node.parent;
        Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
    }
    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
