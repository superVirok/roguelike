import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Node)
    // panelCommodity: cc.Node = null;
    // @property(cc.Node)
    // panelLimit: cc.Node = null;
    // @property(cc.Node)
    // panelSkin: cc.Node = null;

    @property(cc.Node)
    panelLayer: cc.Node = null;

    @property(cc.Node)
    btnSkin: cc.Node = null;
    @property(cc.Node)
    btnCommodity: cc.Node = null;
    @property(cc.Node)
    btnSpecialActive: cc.Node = null;

    init() {
        Func.changePanel(this.panelLayer, "panel", "panelLimit");
    }

    // LIFE-CYCLE CALLBACKS:
    onOpenPanelSkin() {
        this.btnSpecialActive.active = false;
        this.btnSkin.getChildByName("isActive").active = true;
        this.btnCommodity.getChildByName("isActive").active = false;
        Func.changePanel(this.panelLayer, "panel", "panelSkin");
    }

    onOpenPanelLimit() {
        this.btnSpecialActive.active = true;
        this.btnSkin.getChildByName("isActive").active = false;
        this.btnCommodity.getChildByName("isActive").active = false;
        Func.changePanel(this.panelLayer, "panel", "panelLimit");
    }

    onOpenPanelCommodity() {
        this.btnSpecialActive.active = false;
        this.btnSkin.getChildByName("isActive").active = false;
        this.btnCommodity.getChildByName("isActive").active = true;
        Func.changePanel(this.panelLayer, "panel", "panelCommodity");
    }
    // onLoad () {}

    onClose() {
        Func.closePanel(this.node);
    }

    start() {
        this.init()
    }

    // update (dt) {}
}
