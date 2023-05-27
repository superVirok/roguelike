import { Res } from "../lib/res"
class SkillHolyLight0 {
    private static atkDir: any = null;
    private static target: any = null;
    static play(role: cc.Node, enemyMgr: cc.Node, skillTime: number) {
        this.target = null;
        // if (enemyMgr.children.length > 0) {
        // for (let enemy of enemyMgr.children) {
        //     let z = Math.pow(
        //         Math.pow(enemy.x + enemyMgr.x - role.x, 2) +
        //         Math.pow(enemy.y + enemyMgr.y - role.y, 2), 0.5);
        //     if (dis > z) {
        //         this.target = enemy;
        //         dis = z;
        //     }
        // }
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight0"));
        skillNode.active = false;
        role.getChildByName("skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        let script = skillNode.getComponent("skill");
        this.atkDir = script.atkDir;
        if (script.minDis <= 500) {
            skillNode.active = true;
            let anim = skillNode.getComponent(cc.Animation);
            cc.log(skillNode.name, "+++++++++++++++++++")
            anim.play(skillNode.name);
            this.atkDir = cc.v2(1, 0).signAngle(
                cc.v2((this.target.x + enemyMgr.x) - role.x,
                    (this.target.y + enemyMgr.y) - role.y));
            skillNode.angle = this.atkDir / Math.PI * 180;
            if (role.x - (this.target.x + enemyMgr.x) < 0) {
                skillNode.angle += 180;
            }
            anim.on(cc.Animation.EventType.FINISHED, () => {
                skillNode.removeFromParent();
                skillNode.destroy();
            }, script);
        }
        // }
    }
}

export { SkillHolyLight0 }
