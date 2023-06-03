import { SkillHolyLight0 } from "../skill/skillHolyLight0"
import { SkillHolyLight1 } from "../skill/skillHolyLight1"
import { SkillHolyLight2 } from "../skill/skillHolyLight2"
import { skillEngineOil0 } from "../skill/skillEngineOil0"
import { skillEngineOil1 } from "../skill/skillEngineOil1"
import { skillSwampPet0 } from "../skill/skillSwampPet0"
import { skillSwampPet1 } from "../skill/skillSwampPet1"

class SkillMgr {
    private static skillList: any = {
        "skillHolyLight0": SkillHolyLight0,
        "skillHolyLight1": SkillHolyLight1,
        "skillHolyLight2": SkillHolyLight2,
        "skillEngineOil0": skillEngineOil0,
        "skillEngineOil1": skillEngineOil1,
        "skillSwampPet0": skillSwampPet0,
        "skillSwampPet1": skillSwampPet1
    };

    /**
     * 
     * @param skillName 技能名字
     * @param role 角色
     * @param enemyMgr 敌人管理节点
     * @param skillTime 技能持续时间
     */
    static playSkill(skillName: string, role: cc.Node, skillTime: number) {
        this.skillList[skillName].play(role, skillTime);
    }

}

export { SkillMgr }