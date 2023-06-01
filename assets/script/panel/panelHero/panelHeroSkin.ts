import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    heroInfo: any = null;

    curNode: any = null;

    // LIFE-CYCLE CALLBACKS:

    onBack() {
        let panelLayer = cc.find("Canvas/panelLayer/panelHero/panelLayer");
        Func.changePanel(panelLayer, "panel", "panelHeroProp");
        let panelHeroProp = panelLayer.getChildByName("panelHeroProp");
        let script = panelHeroProp.getComponent("panelHeroProp");
        script.heroInfo = this.heroInfo;
        script.curNode = this.curNode;
    }
    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
