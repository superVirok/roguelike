import { Res } from "../lib/res"
class SkillSwampPet0 {

    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "swampPet0"));
        cc.find("Canvas").addChild(skillNode);
        let script = skillNode.getComponent("skill");
        let anim = skillNode.getComponent(cc.Animation);
        script.scheduleOnce(() => {
            skillNode.x = script.target.x + script.enemyMgr.x;
            skillNode.y = script.target.y + script.enemyMgr.y;
            anim.play();
        })
        setTimeout(() => {
            skillNode.destroy();
        }, skillTime * 1000);
    }
}

export { SkillSwampPet0 }
