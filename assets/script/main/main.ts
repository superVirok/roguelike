
import { Func } from "../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    role: cc.Node = null;

    @property(cc.Node)
    pubmain: cc.Node = null;



    onOpenPanelShop() {
        Func.openPanel("panel", "panelShop");
    }

    onOpenPanelHero() {
        Func.openPanel("panel", "panelHero");
    }

    onOpenPanelAirdrop() {

    }

    onOpenPanelWeapon() {

    }

    onOpenPanelOrder() {

    }

    onOpenPanelDiscrecorder() {

    }


    onOpenPanelCollection() {

    }



    // LIFE-CYCLE CALLBACKS:
    changeScale(time: number, size: number, node: cc.Node) {
        node.runAction(
            cc.sequence(
                cc.scaleTo(time, size),
                cc.scaleTo(0.2, 1.0)
            )
        )
    }

    btnMenuTouchEnd(event: any) {
        this.changeScale(0.2, 1.1, event.target);
        event.target.active = false;
        if (event.target.name == "state1") {
            let state2 = this.pubmain.getChildByName("itemList").
                getChildByName("btnMenu").getChildByName("state2");
            state2.active = true;
        }
        else {
            let state1 = this.pubmain.getChildByName("itemList").
                getChildByName("btnMenu").getChildByName("state1");
            state1.active = true;
        }
    }

    onLoad() {
        let btnMenu = this.pubmain.getChildByName("itemList").getChildByName("btnMenu");
        let state1 = btnMenu.getChildByName("state1");
        let state2 = btnMenu.getChildByName("state2");
        state1.on(cc.Node.EventType.TOUCH_END, this.btnMenuTouchEnd, this);
        state2.on(cc.Node.EventType.TOUCH_END, this.btnMenuTouchEnd, this);
    }

    start() {
        let uiLayer: cc.Node = cc.find("Canvas/uiLayer");
        for (let child of uiLayer.children) {
            child.zIndex = -child.y;
        }

    }

    update(dt) {
        this.role.zIndex = -this.role.y;
    }
}
