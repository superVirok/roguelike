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
        this.node.x = this.role.x;
        if (this.node.y <= -100) {
            this.node.y = -100;
        }
        else if (this.node.y >= 430) {
            this.node.y = 430;
        }
        cc.log(this.node.y, "----------", this.role.y)
    }
}
