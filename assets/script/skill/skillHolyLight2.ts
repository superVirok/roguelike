import { Res } from "../lib/res"

class SkillHolyLight2 {
    private static atkDir: any = null;
    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight2"));
        let anims = skillNode.getComponentsInChildren(cc.Animation);
        skillNode.x = 0;
        skillNode.y = 0;
        // skillNode.scaleX = role.scaleX;
        let skillMgr = cc.find("Canvas/skillMgr");
        skillMgr.addChild(skillNode)
        let script = skillNode.getComponent("skill");
        script.scheduleOnce(() => {
            this.atkDir = script.atkDir;
            for (let anim of anims) {
                anim.play("holyLight2");
            }
        })

        setTimeout(() => {
            skillNode.destroy();
        }, skillTime * 1000)
    }
}

export { SkillHolyLight2 }