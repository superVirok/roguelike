import { Res } from "../lib/res"
class skillSwampPet1 {
    private static atkDir: any = null;

    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "swampPet1"));
        skillNode.x = role.x;
        skillNode.y = role.y;
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

export { skillSwampPet1 }
