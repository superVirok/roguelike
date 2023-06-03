import { Res } from "../lib/res"
class SkillEngineOil0 {
    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "engineOil0"));
        cc.find("Canvas").addChild(skillNode);
        let script = skillNode.getComponent("skill");
        let anim = skillNode.getComponent(cc.Animation);
        script.scheduleOnce(() => {
            skillNode.x = role.x;
            skillNode.y = role.y;
            anim.play();
        })
        setTimeout(() => {
            skillNode.destroy();
        }, skillTime * 1000);
    }
}

export { SkillEngineOil0 }
