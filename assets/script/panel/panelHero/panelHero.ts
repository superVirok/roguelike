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

    curNode: any = null;

    // onLoad () {}

    onBack() {
        Func.closePanel(this.node);
        let role = cc.find("Canvas/uiLayer/role");
        role.getComponent(cc.Animation).play(role["animIdle"]);
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
            node["roleName"] = name;
            node["selected"] = this.heroJson[name].selected;
            node["selectedId"] = this.heroJson[name].selectedId;
            if (mask.active) {
                let data = this.heroJson[name];
                node.on(cc.Node.EventType.TOUCH_END, () => {
                    this.openPanelUnlockInfo(this.heroJson[name], node);
                }, this)
            }
            else {
                if (isActive.active) {
                    let panelHeroProp = this.panelLayer.getChildByName("panelHeroProp");
                    let script = panelHeroProp.getComponent("panelHeroProp");
                    script.heroInfo = this.heroJson[name];
                    this.curNode = node;
                    script.curNode = this.curNode;
                }
                node.on(cc.Node.EventType.TOUCH_END, () => {
                    Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
                    let panelHeroProp = this.panelLayer.getChildByName("panelHeroProp");
                    let script = panelHeroProp.getComponent("panelHeroProp");
                    this.curNode.getChildByName("isActive").active = false;
                    node.getChildByName("isActive").active = true;
                    script.heroInfo = this.heroJson[node["roleName"]];
                    this.curNode = node;
                    script.curNode = this.curNode;
                }, this)
            }
        }
    }

    protected onEnable(): void {

    }

    start() {
        this.panelLayer = this.node.getChildByName("panelLayer");
        Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
        if (!cc.sys.localStorage.getItem("heroJson")) {
            this.heroJson = Res.getRes("json", "hero").json;
            let hero = JSON.stringify(this.heroJson);
            cc.sys.localStorage.setItem("heroJson", hero);
        } else {
            this.heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson"));
        }
        this.init();
    }



    // update (dt) {}
}
