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

        if (this.node.x >= 360) {
            this.node.x = 360;
        }
        if (this.node.x <= -360) {
            this.node.x = -360;
        }
        if (this.node.y >= 785) {
            this.node.y = 785;
        }
        if (this.node.y <= -450) {
            this.node.y = -450;
        }
    }
}
