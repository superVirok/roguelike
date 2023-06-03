

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    atkDir: number = 0;

    enemyMgr: cc.Node = null;

    minDis: number = 9999;

    target: any = null;

    role: any = null;

    skillMgr: any = null;

    isMove: boolean = false;

    start() {
        this.role = cc.find("Canvas/role");
        this.enemyMgr = cc.find("Canvas/enemyMgr");
        this.skillMgr = cc.find("Canvas/skillMgr");
    }

    update(dt) {
        this.skillMgr.x = this.role.x;
        this.skillMgr.y = this.role.y;
        if (!this.isMove) {
            this.node.x = 0;
            this.node.y = 0;
        }
        else {
            this.node.getComponent(cc.RigidBody).linearVelocity =
                cc.v2(Math.cos(this.node["atkDir"]) * 500, Math.sin(this.node["atkDir"]) * 500);
            return;
        }

        if (this.enemyMgr.children.length > 0) {
            for (let enemy of this.enemyMgr.children) {
                let z = Math.pow(
                    Math.pow(enemy.x + this.enemyMgr.x - this.role.x, 2) +
                    Math.pow(enemy.y + this.enemyMgr.y - this.role.y, 2), 0.5);
                if (this.minDis > z) {
                    this.target = enemy;
                    this.minDis = z;
                }
            }
            this.atkDir = cc.v2(0, 1).signAngle(
                cc.v2(this.target.x + this.enemyMgr.x - this.role.x,
                    this.target.y + this.enemyMgr.y - this.role.y));
        }

        // if (this.node.name == "holyLight1") {
        //     this.node.getComponent(cc.RigidBody).linearVelocity =
        //         cc.v2(Math.cos(this.atkDir) * 100, Math.sin(this.atkDir) * 100);
        // }

    }
}
