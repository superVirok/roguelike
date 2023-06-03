import { Res } from "../../lib/res"
import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    heroInfo: any = null;

    curNode: any = null;

    curSkinNode: any = null;

    heroJson: any = null;
    @property(cc.RichText)
    skinName: cc.RichText = null;

    @property(cc.Node)
    skinStatic: cc.Node = null;
    @property(cc.Node)
    skinDynamic: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Node)
    skinItem: cc.Node = null;
    @property(cc.Node)
    stateActive: cc.Node = null;
    @property(cc.Node)
    btnChange: cc.Node = null;

    @property(cc.Node)
    unavail: cc.Node = null;


    init() {
        let selectId = this.curNode["selectId"];
        let heroName = this.curNode["roleName"];
        let skinInfo = this.heroInfo.sprite[selectId].skinInfo;
        this.skinName.string = skinInfo;

        for (let name in this.heroInfo.sprite) {
            let node = cc.instantiate(this.skinItem);
            let sprite = node.getChildByName("skinIcon").getComponent(cc.Sprite);
            sprite.spriteFrame = Res.getRes("heroSprite", name);

            let using = node.getChildByName("using");
            node["roleName"] = heroName;
            node["animIdle"] = this.heroInfo.sprite[name].animIdle;
            node["animMove"] = this.heroInfo.sprite[name].animMove;
            node["selectId"] = name;
            node["selected"] = false;
            if (node["selectId"] == this.heroInfo["selectId"]) {
                node["selected"] = true;
                using.active = true;
                this.curSkinNode = node;
                this.btnChange.active = false;
                this.stateActive.active = true;
                let sprite = this.skinStatic.getComponent(cc.Sprite);
                let modelSpriteId = this.heroInfo.sprite[this.curSkinNode["selectId"]].modelSprite;
                sprite.spriteFrame = Res.getRes("heroSprite", modelSpriteId);
            }
            else {
                using.active = false;
                this.btnChange.active = true;
                this.stateActive.active = false;
            }
            this.content.addChild(node);
            node.active = true;
            node.x = 0;
            node.on(cc.Node.EventType.TOUCH_END, () => {
                this.curSkinNode["selected"] = false;
                node["selected"] = true;
                this.curSkinNode = node;
                let sprite = this.skinStatic.getComponent(cc.Sprite);
                let modelSpriteId = this.heroInfo.sprite[this.curSkinNode["selectId"]].modelSprite;
                sprite.spriteFrame = Res.getRes("heroSprite", modelSpriteId);
                if (this.heroInfo.sprite[this.curSkinNode["selectId"]].avail) {
                    this.unavail.active = false;
                    if (this.curSkinNode.getChildByName("using").active) {
                        this.btnChange.active = false;
                        this.stateActive.active = true;
                    }
                    else {
                        this.btnChange.active = true;
                        this.stateActive.active = false;
                    }
                }
                else {
                    this.unavail.active = true;
                    this.btnChange.active = false;
                    this.stateActive.active = false;
                }
            }, this)
        }
    }
    onChangeSkin() {
        for (let node of this.curSkinNode.parent.children) {
            node["selected"] = false;
            node.getChildByName("using").active = false;
        }
        for (let node1 of this.curNode.parent.children) {
            node1["selected"] = false;
            if (node1["roleName"] == this.curSkinNode["roleName"]) {
                node1["selected"] = true;
                this.curNode = node1;
            }
        }
        for (let name in this.heroJson) {
            this.heroJson[name].selected = false;
        }
        this.curNode["selected"] = true;
        this.curSkinNode["selected"] = true;
        this.btnChange.active = false;
        this.stateActive.active = true;
        this.unavail.active = false;
        this.heroInfo.selected = true;
        this.curSkinNode.getChildByName("using").active = true;
        this.heroJson[this.curSkinNode["roleName"]].selected = true;
        this.heroInfo.selectId = this.curSkinNode["selectId"]
        this.heroJson[this.curSkinNode["roleName"]].selectId = this.curSkinNode["selectId"]
        let role = cc.find("Canvas/uiLayer/role");
        let sprite = role.getComponent(cc.Sprite);
        let selectId = this.heroInfo.selectId;
        this.scheduleOnce(() => {
            role["animIdle"] = this.heroInfo.sprite[selectId].animIdle;
            role["animMove"] = this.heroInfo.sprite[selectId].animMove;
            role["spriteId"] = this.heroInfo.sprite[selectId].idleSprite;
            sprite.spriteFrame = Res.getRes("heroSprite", this.heroInfo.sprite[selectId].idleSprite)
        })
        cc.sys.localStorage.setItem("heroJson", JSON.stringify(this.heroJson));
    }


    onChangeState() {
        if (this.skinStatic.active) {
            this.skinStatic.active = false;
            this.skinDynamic.active = true;
            let anim = this.skinDynamic.getComponent(cc.Animation);
            anim.play(this.curSkinNode["animIdle"]);
        } else {
            this.skinStatic.active = true;
            let anim = this.skinDynamic.getComponent(cc.Animation);
            anim.stop(this.curSkinNode["animIdle"]);
            this.skinDynamic.active = false;
            let sprite = this.skinStatic.getComponent(cc.Sprite);
            let modelSpriteId = this.heroInfo.sprite[this.curSkinNode["selectId"]].modelSprite;
            sprite.spriteFrame = Res.getRes("heroSprite", modelSpriteId);
        }
    }

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
        if (!cc.sys.localStorage.getItem("heroJson")) {
            this.heroJson = Res.getRes("json", "hero").json;
            cc.sys.localStorage.setItem("heroJson", JSON.stringify(this.heroJson));
        }
        else {
            this.heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson"));
        }
        this.init();
    }

    // update (dt) {}
}
