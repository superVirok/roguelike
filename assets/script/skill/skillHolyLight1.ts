import { Res } from "../lib/res"
class SkillHolyLight1 {
    private static atkDir: any = null;
    private static isPlay: any = false;
    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight1"));
        let script = skillNode.getComponent("skill");
        cc.find("Canvas/skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        // if (script.role.x - (script.target.x + script.enemyMgr.x) > 0) {
        //     skillNode.angle += 180;
        // }

        let anims = skillNode.getComponentsInChildren(cc.Animation);
        // script.scheduleOnce(() => {
        script.scheduleOnce(() => {
            this.atkDir = script.atkDir;
            skillNode["atkDir"] = this.atkDir;
            skillNode.angle = (this.atkDir / Math.PI) * 180;
            for (let anim of anims) {
                anim.play();
            }
            this.isPlay = true;
            if (script.role.x - (script.target.x + script.enemyMgr.x) > 0) {
                skillNode.angle += 180;
            }
            if (script.role.y - (script.target.y + script.enemyMgr.y) > 0) {
                skillNode.angle += 180;
            }
        })
        setTimeout(() => {
            if (this.isPlay) {
                let rigidBody = skillNode.getComponent(cc.RigidBody);
                skillNode.getComponent("skill").isMove = true;
                skillNode["atkDir"] = ((skillNode.angle - 90) / 180) * Math.PI;
                rigidBody.linearVelocity = cc.v2(Math.cos(skillNode["atkDir"]) * 500, Math.sin(skillNode["atkDir"]) * 500);
            }
        }, skillTime * 500);
        setTimeout(() => {
            skillNode.destroy();
        }, skillTime * 1000);
    }


}

export { SkillHolyLight1 }
