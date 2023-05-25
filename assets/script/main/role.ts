const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Node)
    // stickBase: cc.Node = null;

    // @property(cc.Node)
    // joyStick: cc.Node = null;

    // animation: any = null;

    // moveDir: number = 0;

    protected onLoad(): void {
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }




    start() {
        // this.animation = this.getComponent(cc.Animation);

        // this.stickBase.on(cc.Node.EventType.TOUCH_START, (event: cc.Touch) => {
        //     let pos = event.getLocation();
        //     pos = this.stickBase.convertToNodeSpaceAR(pos);
        //     this.joyStick.setPosition(pos);
        //     let x = Math.floor(pos.x);
        //     let y = Math.floor(pos.y);
        //     let z = Math.pow(x * x + y * y, 0.5);
        //     if (z > 35) {
        //         this.joyStick.x = 35 * x / z;
        //         this.joyStick.y = 35 * y / z;
        //     }
        //     this.moveDir = cc.v2(1, 0).signAngle(cc.v2(x, y));
        //     this.node.scaleX = Math.cos(this.moveDir) > 0 ? 1 : -1;
        //     cc.log(Math.cos(this.moveDir))
        //     this.animation.play("auroramove");
        // })

        // this.stickBase.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Touch) => {
        //     let pos = event.getLocation();
        //     pos = this.stickBase.convertToNodeSpaceAR(pos);
        //     this.joyStick.setPosition(pos);
        //     let x = Math.floor(pos.x);
        //     let y = Math.floor(pos.y);
        //     let z = Math.pow(x * x + y * y, 0.5);
        //     if (z > 35) {
        //         this.joyStick.x = 35 * x / z;
        //         this.joyStick.y = 35 * y / z;
        //     }
        //     this.moveDir = cc.v2(1, 0).signAngle(cc.v2(x, y));

        // })

        // this.stickBase.on(cc.Node.EventType.TOUCH_END, (event: cc.Touch) => {
        //     this.moveDir = 0;
        //     this.joyStick.setPosition(cc.v2(0, 0));
        //     this.animation.play("auroraidle");
        // })

        // this.stickBase.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Touch) => {
        //     this.moveDir = 0;
        //     this.joyStick.setPosition(cc.v2(0, 0));
        //     this.animation.play("auroraidle");
        // })
    }

    update(dt) {
        // if (this.moveDir != 0) {
        //     let speed = cc.v2(Math.cos(this.moveDir) * 100, Math.sin(this.moveDir) * 100);
        //     this.node.getComponent(cc.RigidBody).linearVelocity = speed;
        //     this.node.zIndex = -this.node.y;
        // } else {
        //     this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        // }
        // if (this.node.x >= 360) {
        //     this.node.x = 360;
        // }
        // if (this.node.x <= -360) {
        //     this.node.x = -360;
        // }
        // if (this.node.y >= 785) {
        //     this.node.y = 785;
        // }
        // if (this.node.y <= -450) {
        //     this.node.y = -450;
        // }
    }
}
