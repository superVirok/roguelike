import { Func } from "../../lib/func"
import { Res } from "../../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    panelLayer: cc.Node = null;


    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    heroItem: cc.Node = null;

    heroJson: any = null;

    @property(cc.Node)
    panelUnlockInfo: cc.Node = null;

    // onLoad () {}

    onBack() {
        Func.closePanel(this.node);
    }

    closePanelUnlockInfo() {
        this.panelUnlockInfo.active = false;
    }

    openPanelUnlockInfo(hero: Object, node: cc.Node) {
        this.panelUnlockInfo.active = true;
        let sprite = this.panelUnlockInfo.getChildByName("sprite").getComponent(cc.Sprite);
        sprite.spriteFrame = node.getChildByName("heroIcon").getComponent(cc.Sprite).spriteFrame;
        let heroName = this.panelUnlockInfo.getChildByName("heroName").getComponent(cc.Label);
        heroName.string = hero["name"];
        let heroInfo = this.panelUnlockInfo.getChildByName("heroInfo").getComponent(cc.Label);
        heroInfo.string = hero["unLockInfo"];
    }
    init() {
        for (let name in this.heroJson) {
            let node = cc.instantiate(this.heroItem);
            let sprite = node.getChildByName("heroIcon").getComponent(cc.Sprite);
            sprite.spriteFrame = Res.getRes("heroSprite", this.heroJson[name].avatar);
            let heroName = node.getChildByName("heroName").getComponent(cc.Label);
            heroName.string = this.heroJson[name].barName;
            let isActive = node.getChildByName("isActive");
            isActive.active = this.heroJson[name].isActive;
            let isLocked = node.getChildByName("isLocked");
            isLocked.active = this.heroJson[name].isLocked;

            let mask = node.getChildByName("mask");
            mask.active = this.heroJson[name].isLocked;
            this.content.addChild(node);
            node.y = 0;
            node.active = true;

            if (mask.active) {
                let data = this.heroJson[name];
                node.on(cc.Node.EventType.TOUCH_END, () => {
                    this.openPanelUnlockInfo(data, node);
                })
            }
        }
    }

    protected onEnable(): void {
        this.heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson"));
        this.init();
    }

    start() {
        this.panelLayer = this.node.getChildByName("panelLayer");
        Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
        if (!cc.sys.localStorage.getItem("heroJson")) {
            this.heroJson = Res.getRes("json", "hero").json;
            let hero = JSON.stringify(this.heroJson);
            cc.sys.localStorage.setItem("heroJson", hero);
        } else {
            this.heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson")).json;
        }
        this.init();
    }



    // update (dt) {}
}
