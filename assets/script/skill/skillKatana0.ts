import { Res } from "../lib/res"
class skillKatana0 {
    private static atkDir: any = null;

    static play(role: cc.Node, skillTime: number) {
        let skillNode = cc.instantiate(Res.getRes("weapon", "katana0"));
        cc.find("Canvas/skillMgr").addChild(skillNode);
        skillNode.x = 0;
        skillNode.y = 0;
        let script = skillNode.getComponent("skill");
        let anim = skillNode.getComponent(cc.Animation);
        script.scheduleOnce(() => {
            skillNode.x = 0;
            skillNode.y = 0;
            anim.play();
        })
        setTimeout(() => {
            skillNode.destroy();
        }, skillTime * 1000);
    }
}

export { skillKatana0 }
