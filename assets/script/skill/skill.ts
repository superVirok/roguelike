

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    atkDir: number = 0;

    enemyMgr: cc.Node = null;

    minDis: number = 9999;

    target: any = null;

    role: any = null;

    skillMgr: any = null;

    start() {
        this.role = cc.find("Canvas/role");
        this.enemyMgr = cc.find("Canvas/enemyMgr");
        this.skillMgr = this.role.getChildByName("skillMgr");
    }

    update(dt) {
        this.skillMgr.x = 0;
        this.skillMgr.y = 0;
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
            // if (this.node.name == "holyLight0" && this.minDis >= 300) {
            //     return;
            // }
            this.atkDir = cc.v2(1, 0).signAngle(
                cc.v2(this.target.x + this.enemyMgr.x - this.role.x,
                    this.target.y + this.enemyMgr.y - this.role.y));
        }



    }
}
