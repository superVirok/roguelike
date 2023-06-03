import { Res } from "../lib/res"
class skillEngineOil1 {
    private static atkDir: any = null;

    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "engineOil1"));
        let script = skillNode.getComponent("skill");
        cc.find("Canvas/skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        let anims = skillNode.getComponentsInChildren(cc.Animation);
        script.scheduleOnce(() => {
            role["speed"] *= 2;
            for (let anim of anims) {
                anim.play();
            }
        })
    }
}

export { skillEngineOil1 }
