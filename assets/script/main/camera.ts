const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    role: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        this.node.y = this.role.y;
        if (this.node.y <= -50) {
            this.node.y = -50;
        }
        else if (this.node.y >= 430) {
            this.node.y = 430;
        }
    }
}
