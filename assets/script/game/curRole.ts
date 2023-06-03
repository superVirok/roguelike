import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    hpLabel: cc.Label = null;

    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null;


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
                this.node["maxHp"] = heroJson[this.node["heroName"]].hp;
                this.node["curHp"] = heroJson[this.node["heroName"]].hp;
                this.node["speed"] = heroJson[this.node["heroName"]].speed;
                this.node["defence"] = heroJson[this.node["heroName"]].defence;
                this.node["recover"] = heroJson[this.node["heroName"]].recover;
                this.node["weaponId"] = heroJson[this.node["heroName"]].weaponId;
                this.node["weaponName"] = heroJson[this.node["heroName"]].weaponName;
                this.node.getComponent(cc.Sprite).spriteFrame = Res.getRes("heroSprite", spriteId);
                break;
            }
        }
        this.hpLabel.string = this.node["curHp"] + "/" + this.node["maxHp"];
        this.hpProgress.progress = this.node["curHp"] / this.node["maxHp"];


    }

    update(dt) {
        if (this.node["curHp"] <= 0) {
            this.node["curHp"] = 0;
        }
        if (this.node["curHp"] + this.node["recover"] <= this.node["maxHp"]) {
            this.node["curHp"] += this.node["recover"];
        }
        this.hpLabel.string = Math.floor(this.node["curHp"]) + "/" + this.node["maxHp"];
        this.hpProgress.progress = this.node["curHp"] / this.node["maxHp"];
    }
}
