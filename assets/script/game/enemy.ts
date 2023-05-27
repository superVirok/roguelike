import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null;

    curHp: number = 0;
    MaxHp: number = 0;
    // onLoad () {}

    start() {
        let json = Res.getRes("json", "enemy").json;
        this.curHp = this.MaxHp = json["maxHp"];
        this.hpProgress.progress = this.curHp / this.MaxHp;
    }

    // update (dt) {}
}
