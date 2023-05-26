const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    joyStick: cc.Node = null;

    @property(cc.Node)
    clickBg: cc.Node = null;

    @property(cc.Node)
    role: cc.Node = null;

    moveDir: number = 0;


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.clickBg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.clickBg.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.clickBg.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.clickBg.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    // LIFE-CYCLE CALLBACKS:
    private onTouchStart(event: cc.Touch) {
        let pos1 = event.getLocation();
        pos1 = this.node.parent.convertToNodeSpaceAR(pos1);
        this.node.setPosition(pos1);

        this.node.runAction(
            cc.fadeTo(0.5, 255)
        )

        this.role.getComponent(cc.Animation).play("AuroraMove");
    }

    private onTouchMove(event: cc.Touch) {
        this.role.scaleX = (event.getLocationX() - event.getStartLocation().x) > 0 ? 1 : -1;
        let pos = event.getLocation();
        pos = this.node.convertToNodeSpaceAR(pos);
        this.joyStick.setPosition(pos);
        let x = Math.floor(pos.x);
        let y = Math.floor(pos.y);
        let z = Math.pow(x * x + y * y, 0.5);
        if (z > 65) {
            this.joyStick.x = 65 * x / z;
            this.joyStick.y = 65 * y / z;
        }
        this.moveDir = cc.v2(1, 0).signAngle(cc.v2(x, y));
    }

    private onTouchCancel(event: cc.Touch) {
        this.moveDir = 0;
        this.joyStick.setPosition(cc.v2(0, 0));
        this.role.getComponent(cc.Animation).play("AuroraIdle");
        this.node.runAction(
            cc.fadeTo(0.3, 0)
        )
    }

    private onTouchEnd(event: cc.Touch) {
        this.moveDir = 0;
        this.joyStick.setPosition(0, 0);
        this.role.getComponent(cc.Animation).play("AuroraIdle");
        this.node.runAction(
            cc.fadeTo(0.3, 0)
        )

    }


    start() {

    }

    update(dt) {
        if (this.moveDir != 0) {
            let speed = cc.v2(Math.cos(this.moveDir) * 150, Math.sin(this.moveDir) * 150);
            this.role.getComponent(cc.RigidBody).linearVelocity = speed;
        } else {
            this.role.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }
}
