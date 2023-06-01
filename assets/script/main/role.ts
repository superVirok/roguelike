import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tipOpenPanelHero: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelAirdrop: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelWeapon: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelOrder: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelDiscrecorder: cc.Node = null;

    @property(cc.Node)
    tipOpenPanelCollection: cc.Node = null;

    protected onLoad(): void {

    }


    onCollisionEnter(other: any, self: any) {
        if (other.tag == 1) {
            this.tipOpenPanelHero.active = true;
        }
        else if (other.tag == 2) {
            this.tipOpenPanelWeapon.active = true;
        }
        else if (other.tag == 3) {
            this.tipOpenPanelOrder.active = true;
        }
        else if (other.tag == 4) {
            this.tipOpenPanelAirdrop.active = true;
        }
        else if (other.tag == 5) {
            this.tipOpenPanelDiscrecorder.active = true;
        }
        else if (other.tag == 6) {
            this.tipOpenPanelCollection.active = true;
        }
    }

    onCollisionExit(other: any, self: any) {
        if (other.tag == 1) {
            this.tipOpenPanelHero.active = false;
        }
        else if (other.tag == 2) {
            this.tipOpenPanelWeapon.active = false;
        }
        else if (other.tag == 3) {
            this.tipOpenPanelOrder.active = false;
        }
        else if (other.tag == 4) {
            this.tipOpenPanelAirdrop.active = false;
        }
        else if (other.tag == 5) {
            this.tipOpenPanelDiscrecorder.active = false;
        }
        else if (other.tag == 6) {
            this.tipOpenPanelCollection.active = false;
        }
    }



    start() {
        let heroJson = null;
        if (!cc.sys.localStorage.getItem("heroJson")) {
            heroJson = Res.getRes("json", "hero").json;
            cc.sys.localStorage.setItem("heroJson", JSON.stringify(heroJson));
        }
        else {
            heroJson = JSON.parse(cc.sys.localStorage.getItem("heroJson"));
        }
        for (let name in heroJson) {
            if (heroJson[name].selected) {
                this.node["heroName"] = name;
                let spriteId = heroJson[name].sprite[heroJson[name].selectId].idleSprite
                this.node["animIdle"] = heroJson[name].sprite[heroJson[name].selectId].animIdle;
                this.node["animMove"] = heroJson[name].sprite[heroJson[name].selectId].animMove;
                this.node.getComponent(cc.Sprite).spriteFrame = Res.getRes("heroSprite", spriteId);
                break;
            }
        }
    }

    update(dt) {

    }
}
