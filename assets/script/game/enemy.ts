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

    onCollisionEnter(other: any, self: any) {
        if (!this.skillJson) {
            this.skillJson = Res.getRes("json", "skill").json;
        }
        if (other.tag == 0) {
            this.flag = true;
        }
        if (other.tag == 51) {
            this.curHp -= this.skillJson["skillHolyLight0"].hurt;
        }
        else if (other.tag == 52) {
            this.curHp -= this.skillJson["skillHolyLight0"]["5"].hurt;
        }
        else if (other.tag == 53) {
            this.curHp -= this.skillJson["skillHolyLight0"]["6"].hurt;
        }
        else if (other.tag == 54) {
            this.curHp -= this.skillJson["skillEngineOil0"].hurt;
        }
        else if (other.tag == 55) {
            this.curHp -= this.skillJson["skillEngineOil0"]["6"].hurt;
        }
        else if (other.tag == 56) {
            this.curHp -= this.skillJson["skillSwampPet0"].hurt;
        }
        else if (other.tag == 57) {
            this.curHp -= this.skillJson["skillSwampPet0"]["5"].hurt;
        }
        else if (other.tag == 58) {
            this.curHp -= this.skillJson["skillKatana0"].hurt;
        }
    }

    onCollisionStay(other: any, self: any) {
        if (!this.skillJson) {
            this.skillJson = Res.getRes("json", "skill").json;
        }
        if (other.tag == 0) {
            this.flag = true;
        }
        if (other.tag == 52) {
            this.curHp -= this.skillJson["skillHolyLight0"]["5"].hurt;
        }
        else if (other.tag == 53) {
            this.curHp -= this.skillJson["skillHolyLight0"]["6"].hurt;
        }
        else if (other.tag == 55) {
            this.curHp -= this.skillJson["skillEngineOil0"]["6"].hurt;
        }
        else if (other.tag == 57) {
            this.curHp -= this.skillJson["skillSwampPet0"]["5"].hurt;
        }

    }

    onCollisionExit(other: any, self: any) {
        if (other.tag == 0) {
            this.flag = false;
        }
    }


    // onLoad() {
    // }

    start() {
        this.role = cc.find("Canvas/role");
        this.skillJson = Res.getRes("json", "skill").json;
        this.enemyJson = Res.getRes("json", "enemy").json;
        this.hpProgress.progress = this.curHp / this.MaxHp;
        this.node["expId"] = this.enemyJson[this.node["name"]].expId;
        this.curHp = this.MaxHp = this.enemyJson[this.node["name"]].maxHp;
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
            expNode.x = this.node.x;
            expNode.y = this.node.y;
            expMgr.addChild(expNode);
            expNode.active = true;
            this.scheduleOnce(() => {
                this.node.destroy();
            })
        }
        this.hpProgress.progress = this.curHp / this.MaxHp;
    }
}
