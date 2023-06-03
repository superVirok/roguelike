import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    role: any = null;
    // LIFE-CYCLE CALLBACKS:
    exp: number = 0;
    // onLoad () {}
    onCollisonEnter(other: any, self: any) {
        if (other.tag == 0) {
            //加经验值

            this.node.destroy();
        }
    }

    start() {
        this.role = cc.find("Canvas/role");
        let expJson = Res.getRes("json", "exp").json;
        this.exp = expJson[this.node.name];
    }

    // update (dt) {}
}
