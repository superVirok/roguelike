import { Res } from "../lib/res"
class SkillHolyLight1 {
    private static atkDir: any = null;
    private static target: any = null;
    static play(role: cc.Node, enemyMgr: cc.Node, skillTime: number) {
        this.target = null;
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight1"));
        role.getChildByName("skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        let dis = 99999;
        if (enemyMgr.children.length > 0) {
            for (let enemy of enemyMgr.children) {
                let z = Math.pow(
                    Math.pow(enemy.x + enemyMgr.x - role.x, 2) +
                    Math.pow(enemy.y + enemyMgr.y - role.y, 2), 0.5);
                if (dis > z) {
                    this.target = enemy;
                    dis = z;
                }
            }
            this.atkDir = cc.v2(1, 0).signAngle(
                cc.v2(this.target.x + enemyMgr.x - role.x,
                    this.target.y + enemyMgr.y - role.y));
        }
        let anims = skillNode.getComponentsInChildren(cc.Animation);
        for (let anim of anims) {
            anim.play("holyLight1");
            anim.on(cc.Animation.EventType.FINISHED, () => {

                while (anim.node) {
                    let rigidBody = anim.node.getComponent(cc.RigidBody);
                    rigidBody.linearVelocity = cc.v2(Math.cos(this.atkDir) * 30, Math.sin(this.atkDir) * 30);
                }
            }, anim.node.getComponent("skill"));
            // 设置循环模式为 Loop
            setTimeout(() => {
                skillNode.destroy();
            }, skillTime * 1000)
        }

        // // 设置动画循环次数为 3 次
        // animState.repeatCount = 3;
    }
}

export { SkillHolyLight1 }
