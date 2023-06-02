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

    lockNode: any = null;

    price: number = 0;


    accountJson: any = null;
    // onLoad () {}

    onBuyHero() {
        cc.log(this.price, this.accountJson)
        if (this.price > this.accountJson["coinNum"]) {
            return;
        }
        else {
            this.closePanelUnlockInfo();
            this.accountJson["coinNum"] -= this.price;
            this.heroJson[this.lockNode["roleName"]].isLocked = false;
            this.lockNode.getChildByName("mask").active = false;
            this.lockNode.getChildByName("isLocked").active = false;
            cc.sys.localStorage.setItem("account", JSON.stringify(this.accountJson));
            cc.sys.localStorage.setItem("heroJson", JSON.stringify(this.heroJson));
            this.lockNode.targetOff(cc.Node.EventType.TOUCH_START);
            this.lockNode.on(cc.Node.EventType.TOUCH_END, () => {
                Func.changePanel(this.panelLayer, "panel", "panelHeroProp");
                let panelHeroProp = this.panelLayer.getChildByName("panelHeroProp");
                let script = panelHeroProp.getComponent("panelHeroProp");
                this.curNode.getChildByName("isActive").active = false;
                this.lockNode.getChildByName("isActive").active = true;
                script.heroInfo = this.heroJson[this.lockNode["roleName"]];
                this.curNode = this.lockNode;
                script.curNode = this.curNode;
            }, this)
        }
    }

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
        let coinNum = this.panelUnlockInfo.getChildByName("btnUnlock").getChildByName("numLabel").getComponent(cc.Label);
        coinNum.string = this.heroJson[node["roleName"]].price;
        this.lockNode = node;
        this.price = this.heroJson[node["roleName"]].price;
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
            node["selectId"] = this.heroJson[name].selectId;
            if (mask.active) {
                node.on(cc.Node.EventType.TOUCH_START, () => {
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
        this.accountJson = JSON.parse(cc.sys.localStorage.getItem("account"))
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
