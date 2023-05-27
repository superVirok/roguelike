import { SkillHolyLight0 } from "../skill/skillHolyLight0"
import { SkillHolyLight1 } from "../skill/skillHolyLight1"
import { SkillHolyLight2 } from "../skill/skillHolyLight2"
class SkillMgr {
    private static skillList: any = {
        "skillHolyLight0": SkillHolyLight0,
        "skillHolyLight1": SkillHolyLight1,
        "skillHolyLight2": SkillHolyLight2
    };

    /**
     * 
     * @param skillName 技能名字
     * @param role 角色
     * @param enemyMgr 敌人管理节点
     * @param skillTime 技能持续时间
     */
    static playSkill(skillName: string, role: cc.Node, enemyMgr: cc.Node, skillTime: number) {
        this.skillList[skillName].play(role, enemyMgr, skillTime);
    }

}

export { SkillMgr }