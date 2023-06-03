import { Res } from "../lib/res"
class skillSwampPet0 {
    private static atkDir: any = null;
    private static target: any = null;
    static play(role: cc.Node, skillTime: number) {
        this.target = null;
        let skillNode = cc.instantiate(Res.getRes("weapon", "swampPet0"));
        cc.find("Canvas").addChild(skillNode);
        let script = skillNode.getComponent("skill");
        skillNode.x = script.target.x + script.enemyMgr.x;
        skillNode.y = script.target.y + script.enemyMgr.y;

        let anim = skillNode.getComponent(cc.Animation);
        script.scheduleOnce(() => {
            skillNode.x = script.target.x + script.enemyMgr.x;
            skillNode.y = script.target.y + script.enemyMgr.y;
        })
        anim.on(cc.Animation.EventType.FINISHED, () => {
            skillNode.destroy();
        }, script);
    }
}

export { skillSwampPet0 }
