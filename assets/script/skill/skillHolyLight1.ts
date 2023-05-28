import { Res } from "../lib/res"
class SkillHolyLight1 {
    private static atkDir: any = null;
    private static target: any = null;
    static play(role: cc.Node, skillTime: number) {
        this.target = null;
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight1"));
        let script = skillNode.getComponent("skill");
        this.atkDir = script.atkDir;
        role.getChildByName("skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        skillNode.angle = this.atkDir / Math.PI * 180;
        if (script.role.x - (script.target.x + script.enemyMgr.x) > 0) {
            skillNode.angle += 180;
        }
        cc.log(skillNode.angle, "------")
        let anims = skillNode.getComponentsInChildren(cc.Animation);
        // script.scheduleOnce(() => {
        for (let anim of anims) {
            anim.play();
            anim.on(cc.Animation.EventType.STOP, () => {
                if (skillNode.isValid) {
                    script.scheduleOnce(() => {
                        cc.log(anim.node.getComponent("skill").isMove)
                        anim.node.getComponent("skill").isMove = true;
                        let rigidBody = anim.node.getComponent(cc.RigidBody);
                        rigidBody.linearVelocity = cc.v2(Math.cos(this.atkDir) * 500, Math.sin(this.atkDir) * 500);
                    })
                }
            }, anim.node.getComponent("skill"));
        }
        // })
        setTimeout(() => {
            for (let anim of anims) {
                anim.stop();
            }
            cc.log("设置延时", skillTime * 0.8)
        }, skillTime * 800);
        setTimeout(() => {
            skillNode.destroy();
        }, skillTime * 1000);
    }


}

export { SkillHolyLight1 }
