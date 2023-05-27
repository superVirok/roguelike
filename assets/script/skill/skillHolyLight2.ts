import { Res } from "../lib/res"

class SkillHolyLight2 {

    static play(role: cc.Node, enemyMgr: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "holyLight2"));
        let anims = skillNode.getComponentsInChildren(cc.Animation);
        skillNode.x = 0;
        skillNode.y = 0;
        skillNode.scaleX = role.scaleX;
        let skillMgr = role.getChildByName("skillMgr");
        skillMgr.addChild(skillNode)
        for (let anim of anims) {

            anim.play("holyLight2");
        }
        setTimeout(() => {

            skillNode.destroy();
        }, skillTime * 1000)
    }
}

export { SkillHolyLight2 }