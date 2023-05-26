import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    panelLayer: cc.Node = null;
    // onLoad () {}

    onBack() {
        Func.closePanel(this.node);
    }


    start() {
        this.panelLayer = this.node.getChildByName("panelLayer");
        Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
    }

    // update (dt) {}
}
