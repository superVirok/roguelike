import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    hpLabel: cc.Label = null;

    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null;

    curHp: number = 0;
    maxHp: number = 0;
    defence: number = 0;
    recover: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

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
                let spriteId = heroJson[name].sprite[heroJson[name].selectId].idleSprite;
                this.node["animIdle"] = heroJson[name].sprite[heroJson[name].selectId].animIdle;
                this.node["animMove"] = heroJson[name].sprite[heroJson[name].selectId].animMove;
                this.node.getComponent(cc.Sprite).spriteFrame = Res.getRes("heroSprite", spriteId);
                break;
            }
        }
        this.curHp = this.maxHp = heroJson[this.node["heroName"]].hp;
        this.defence = heroJson[this.node["heroName"]].defence;
        this.recover = heroJson[this.node["heroName"]].recover;
        this.hpLabel.string = this.curHp + "/" + this.maxHp;
        this.hpProgress.progress = this.curHp / this.maxHp;


    }

    update(dt) {
        if (this.curHp + this.recover <= this.maxHp) {
            this.curHp += this.recover;
        }
    }
}
