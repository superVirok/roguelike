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
    hurt: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let json = Res.getRes("json", "account").json;
        this.curHp = this.maxHp = json["curRole"].maxHp;
        this.hurt = json["curRole"].hurt;
        this.hpLabel.string = this.curHp + "/" + this.maxHp;
        this.hpProgress.progress = this.curHp / this.maxHp;
    }

    update(dt) {

    }
}
