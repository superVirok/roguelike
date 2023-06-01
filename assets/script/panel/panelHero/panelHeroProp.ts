import { Res } from "../../lib/res"
import { Func } from "../../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    heroInfo: any = null;

    curNode: any = null;
    // LIFE-CYCLE CALLBACKS:

    role: any = null;

    @property(cc.Sprite)
    characterBg: cc.Sprite = null;
    @property(cc.Sprite)
    weaponBg: cc.Sprite = null;
    @property(cc.Label)
    weaponName: cc.Label = null;
    @property(cc.Label)
    heroName: cc.Label = null;

    @property(cc.Label)
    propHp: cc.Label = null;
    @property(cc.Label)
    propDefence: cc.Label = null;
    @property(cc.Label)
    propRecover: cc.Label = null;
    @property(cc.Label)
    propSpeed: cc.Label = null;
    @property(cc.Label)
    propLuck: cc.Label = null;
    @property(cc.Label)
    propPickRange: cc.Label = null;

    @property(cc.Node)
    btnState: cc.Node = null;
    @property(cc.Node)
    btnChange: cc.Node = null;
    // onLoad () {}

    onChangeHero() {
        for (let node of this.curNode.parent.children) {
            node["selected"] = false;
            this.curNode["selected"] = true;
        }
        this.btnState.active = true;
        this.btnChange.active = false;
        this.role = cc.find("Canvas/uiLayer/role");
        let heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson"));
        for (let name in heroJson) {
            heroJson[name].selected = false;
        }
        let name = this.curNode["roleName"];
        heroJson[name].selected = true;
        let selectId = heroJson[name].selectId;
        let sprite = this.role.getComponent(cc.Sprite);
        this.scheduleOnce(() => {
            this.role["animIdle"] = heroJson[name].sprite[selectId].animIdle;
            this.role["animMove"] = heroJson[name].sprite[selectId].animMove;
            this.role["spriteId"] = heroJson[name].sprite[selectId].idleSprite;
            sprite.spriteFrame = Res.getRes("heroSprite", heroJson[name].sprite[selectId].idleSprite)
        })
        cc.sys.localStorage.setItem("heroJson", JSON.stringify(heroJson));
    }

    onManage() {
        let panelLayer = cc.find("Canvas/panelLayer/panelHero/panelLayer");
        Func.changePanel(panelLayer, "panel", "panelHeroInfo");
        let panelHeroInfo = panelLayer.getChildByName("panelHeroInfo");
        let script = panelHeroInfo.getComponent("panelHeroInfo");
        script.heroInfo = this.heroInfo;
        script.curNode = this.curNode;
    }

    onChangeSkin() {
        let panelLayer = cc.find("Canvas/panelLayer/panelHero/panelLayer");
        Func.changePanel(panelLayer, "panel", "panelHeroSkin");
        let panelHeroSkin = panelLayer.getChildByName("panelHeroSkin");
        let script = panelHeroSkin.getComponent("panelHeroSkin");
        script.heroInfo = this.heroInfo;
        script.curNode = this.curNode;
    }

    protected onEnable(): void {
        this.scheduleOnce(() => {
            this.characterBg.spriteFrame = Res.getRes("heroSprite", this.heroInfo["defaultBg"]);
            this.weaponBg.spriteFrame = Res.getRes("weaponSprite", this.heroInfo["weaponid"]);
            this.weaponName.string = this.heroInfo["weaponName"];
            this.heroName.string = this.heroInfo["name"];
            this.propHp.string = this.heroInfo["hp"];
            this.propLuck.string = this.heroInfo["luck"];
            this.propRecover.string = this.heroInfo["recover"];
            this.propDefence.string = this.heroInfo["defence"];
            this.propSpeed.string = this.heroInfo["speed"];
            this.propPickRange.string = this.heroInfo["range"];
            if (this.curNode["selected"]) {
                this.btnState.active = true;
                this.btnChange.active = false;
            } else {
                this.btnState.active = false;
                this.btnChange.active = true;
            }
        })
    }

    start() {

    }

    // update (dt) {}
}
