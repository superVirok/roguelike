import { SkillHolyLight0 } from "../skill/skillHolyLight0"
import { SkillHolyLight1 } from "../skill/skillHolyLight1"
import { SkillHolyLight2 } from "../skill/skillHolyLight2"
import { SkillEngineOil0 } from "../skill/skillEngineOil0"
import { SkillEngineOil1 } from "../skill/skillEngineOil1"
import { SkillSwampPet0 } from "../skill/skillSwampPet0"
import { SkillSwampPet1 } from "../skill/skillSwampPet1"
import { SkillKatana0 } from "../skill/skillKatana0"

class SkillMgr {
    private static skillList: any = {
        "skillHolyLight0": SkillHolyLight0,
        "skillHolyLight1": SkillHolyLight1,
        "skillHolyLight2": SkillHolyLight2,
        "skillEngineOil0": SkillEngineOil0,
        "skillEngineOil1": SkillEngineOil1,
        "skillSwampPet0": SkillSwampPet0,
        "skillSwampPet1": SkillSwampPet1,
        "skillKatana0": SkillKatana0
    };

    /**
     * 
     * @param skillName 技能名字
     * @param role 角色
     * @param skillTime 技能持续时间
     */
    static playSkill(skillName: string, role: cc.Node, skillTime: number) {
        this.skillList[skillName].play(role, skillTime);
    }

}

export { SkillMgr }