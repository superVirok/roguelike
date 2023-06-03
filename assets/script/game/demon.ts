const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    role: any = null;

    onCollisionEnter(other: any, self: any) {
        if (other.tag == 0) {
            let anim = this.node.getComponent(cc.Animation);
            anim.stop("appear");
            anim.play("attack");
            this.role["curHp"] -= 20;
        }
    }

    onCollisionStay(other: any, self: any) {
        if (other.tag == 0) {
            this.role["curHp"] -= 1;
        }
    }

    onCollisionExit(other: any, self: any) {
        if (other.tag == 0) {
            let anim = this.node.getComponent(cc.Animation);
            anim.stop("attack");
            anim.play("appear");
        }
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.role = cc.find("Canvas/role");
    }

    // update (dt) {}
}
