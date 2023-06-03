import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    enemyJson: any = null;

    role: any = null;

    @property(cc.Node)
    atk: cc.Node = null;

    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null;

    skillJson: any = null;


    curHp: number = 0;
    MaxHp: number = 0;
    // onLoad () {}

    start() {
        this.role = cc.find("Canvas/role");
        this.skillJson = Res.getRes("json", "skill");
        this.enemyJson = Res.getRes("json", "enemy").json;
        this.curHp = this.MaxHp = this.enemyJson["maxHp"];
        this.hpProgress.progress = this.curHp / this.MaxHp;
        this.node["exp"] = this.enemyJson[this.node.name].exp;
        this.node["expId"] = this.enemyJson[this.node.name].expId;
    }

    update(dt) {
        let x = this.atk.x + this.node.x + this.node.parent.x - this.role.x;
        let y = this.atk.y + this.node.y + this.node.parent.y - this.role.y;
        if (Math.pow(x * x, 0.5) <= 320 && Math.pow(y * y, 0.5) <= 160) {
            let hurt = this.enemyJson["boss"].hurt - this.role["defence"];
            if (hurt > 0) {
                this.role["curHp"] -= hurt * dt;
            }
        }
        this.curHp = this.MaxHp = this.enemyJson["maxHp"];
        this.hpProgress.progress = this.curHp / this.MaxHp;
    }
}
