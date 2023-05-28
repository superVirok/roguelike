import { Res } from "../lib/res"
class SkillHolyLight0 {
    private static atkDir: any = null;
    private static target: any = null;
    static play(role: cc.Node, skillTime: number) {
        this.target = null;
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight0"));
        role.getChildByName("skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        let script = skillNode.getComponent("skill");
        let anim = skillNode.getComponent(cc.Animation);
        script.scheduleOnce(() => {
            this.atkDir = script.atkDir;
            if (script.minDis <= 500) {
                anim.play();
                // this.atkDir = cc.v2(1, 0).signAngle(
                //     cc.v2((this.target.x + enemyMgr.x) - role.x,
                //         (this.target.y + enemyMgr.y) - role.y));
                skillNode.angle = this.atkDir / Math.PI * 180;
                if (script.role.x - (script.target.x + script.enemyMgr.x) > 0) {
                    skillNode.angle += 180;
                }
            }
        })
        anim.on(cc.Animation.EventType.FINISHED, () => {
            script.minDis = 9999;
            skillNode.destroy();
        }, script);

        // }
    }
}

export { SkillHolyLight0 }
