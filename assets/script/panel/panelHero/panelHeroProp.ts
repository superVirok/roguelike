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
    propHpup: cc.Label = null;
    @property(cc.Label)
    propDefence: cc.Label = null;
    @property(cc.Label)
    propHp: cc.Label = null;
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

    onManage() {
        let panelLayer = cc.find("Canvas/panelLayer/panelHero/panelLayer");
        Func.changePanel(panelLayer, "panel", "panelHeroInfo");
    }

    onChangeSkin() {
        let panelLayer = cc.find("Canvas/panelLayer/panelHero/panelLayer");
        Func.changePanel(panelLayer, "panel", "panelHeroSkin");
    }

    protected onEnable(): void {
        this.characterBg.spriteFrame = Res.getRes("heroSprite", this.heroInfo["defaultBg"]);
        this.weaponBg.spriteFrame = Res.getRes("heroSprite", this.heroInfo["weaponid"]);
        this.weaponName.string = this.heroInfo["weaponName"];
        this.heroName.string = this.heroInfo["name"];
        this.propHp.string = this.heroInfo["hp"];
        this.propLuck.string = this.heroInfo["luck"];
        this.propHpup.string = this.heroInfo["recover"];
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
    }

    start() {
        this.role = cc.find("Canvas/uiLayer/role");
        let heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson"));
        this.btnChange.on(cc.Node.EventType.TOUCH_END, () => {
            for (let name in heroJson) {
                heroJson[name].selected = false;
            }
            heroJson[this.curNode["roleName"]].selected = true;
            cc.sys.localStorage.setItem("heroJson", JSON.stringify(heroJson));
        })
    }

    // update (dt) {}
}
