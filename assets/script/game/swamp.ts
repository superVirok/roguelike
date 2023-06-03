import { Res } from "../lib/res"
import { SkillMgr } from "../skill/skillMgr"
import { GameFunc } from "../lib/gameFunc"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    enemyMgr: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    role: cc.Node = null;


    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {
        GameFunc.setMaxEnemyNum(20);
        GameFunc.gameInit(this.enemyMgr);

        let skillJson = Res.getRes("json", "skill").json;
        for (let skill in skillJson) {
            this.schedule(() => {
                SkillMgr.playSkill(skillJson[skill].name, this.role, skillJson[skill].duration);
            }, skillJson[skill].cd)
        }
    }

    update(dt: any) {
        GameFunc.getTime(dt);
        for (let enemy of this.enemyMgr.children) {
            if (enemy && enemy.isValid) {
                let hd = cc.v2(1, 0).signAngle(
                    cc.v2(
                        this.role.x - (enemy.x + this.enemyMgr.x),
                        this.role.y - (enemy.y + this.enemyMgr.y)));
                if (this.role.x - (enemy.x + this.enemyMgr.x) < 0) {
                    enemy.scaleX = -1;
                    enemy.scaleY = 1;
                } else {
                    enemy.scaleX = 1;
                    enemy.scaleY = 1;
                }

                enemy.getChildByName("hpProgress").scaleX = enemy.scaleX;
                let rigidBody = enemy.getComponent(cc.RigidBody);
                rigidBody.linearVelocity = cc.v2(Math.cos(hd) * 50, Math.sin(hd) * 50);
            }
        }
        this.scheduleOnce(() => {
            GameFunc.addEnemy(this.enemyMgr);
        })

    }
}
