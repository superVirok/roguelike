import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    heroInfo: any = null;

    curNode: any = null;

    @property(cc.Label)
    heroName: cc.Label = null;

    @property(cc.Label)
    heroDesc: cc.Label = null;

    @property(cc.Node)
    effectLabel: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}

    onOverview() {
        let panelLayer = cc.find("Canvas/panelLayer/panelHero/panelLayer");
        Func.changePanel(panelLayer, "panel", "panelHeroProp");
        let panelHeroProp = panelLayer.getChildByName("panelHeroProp");
        let script = panelHeroProp.getComponent("panelHeroProp");
        script.heroInfo = this.heroInfo;
        script.curNode = this.curNode;
    }

    onEnable() {
        this.scheduleOnce(() => {
            this.heroName.string = this.heroInfo["name"];
            this.heroDesc.string = this.heroInfo["story"];
            let characteristic = cc.instantiate(this.effectLabel);
            this.content.addChild(characteristic);
            characteristic.x = 0;
            characteristic.active = true;
            characteristic.getComponent(cc.Label).string = this.heroInfo["character"];
        })

    }

    start() {

    }

    // update (dt) {}
}
