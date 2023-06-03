import { Res } from "../lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    role: any = null;
    // LIFE-CYCLE CALLBACKS:
    exp: number = 0;
    // onLoad () {}
    onCollisionEnter(other: any, self: any) {
        if (other.tag == 0) {
            this.node.runAction(
                cc.sequence(
                    cc.moveBy(0.3, 0, 50),
                    cc.callFunc(() => {
                        //加经验值

                        this.node.destroy();
                    })
                )
            )
        }
    }

    start() {
        this.role = cc.find("Canvas/role");
        let expJson = Res.getRes("json", "exp").json;
        this.exp = expJson[this.node.name];
    }

    // update (dt) {}
}
