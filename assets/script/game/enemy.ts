import { Res } from "../lib/res"

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null;

    flag: boolean = false;

    role: any = null;

    curHp: number = 0;
    MaxHp: number = 0;

    enemyJson: any = null;

    skillJson: any = null;

    onCollisonEnter(other: any, self: any) {
        if (other.tag == 0) {
            this.flag = true;
        }
        else if (other.tag == 51) { }
    }

    onCollisionStay(other: any, self: any) {
        if (other.tag == 0) {
            this.flag = true;
        }
    }

    onCollisionExit(other: any, self: any) {
        if (other.tag == 0) {
            this.flag = false;
        }
    }


    // onLoad () {}

    start() {
        this.role = cc.find("Canvas/role");
        this.skillJson = Res.getRes("json", "skill");
        this.enemyJson = Res.getRes("json", "enemy").json;
        this.curHp = this.MaxHp = this.enemyJson[this.node.name].maxHp;
        this.node["exp"] = this.enemyJson[this.node.name].exp;
        this.node["expId"] = this.enemyJson[this.node.name].expId;
        this.hpProgress.progress = this.curHp / this.MaxHp;
    }

    update(dt) {
        if (this.flag) {
            let hurt = this.enemyJson[this.node.name].hurt - this.role["defence"];
            if (hurt > 0) {
                this.role["curHp"] -= hurt * dt;
            }
        }
        if (this.curHp <= 0) {
            let expMgr = cc.find("Canvas/expMgr");
            let expNode = cc.instantiate(Res.getRes("prefab", this.node["expId"]));
            expMgr.addChild(expNode);
            expNode.active = true;
            this.node.destroy();
        }
        this.hpProgress.progress = this.curHp / this.MaxHp;
    }
}
