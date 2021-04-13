import React, {useEffect, useState} from 'react'

const useSkillTitle = (DPH: number | undefined) => {
  const [skillTitle, setSkillTitle] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!DPH){
      setSkillTitle("noob")
    }
    else {
      var newSkill = "novice"
      if (.2 * 5 > DPH ) {
        newSkill = "noob"
      }
      else if (.2 * 5 < DPH && DPH <= 0.4 * 5) {
        newSkill = "apprentice"
      }
      else if (0.4 * 5 < DPH && DPH <= 0.6 * 5) {
        newSkill = "intermediate"
      }
      else if (0.6 * 5 < DPH && DPH <= 0.8 * 5) {
        newSkill = "advanced"
      }
      else {
        newSkill = "elite"
      }
      setSkillTitle(newSkill)
    }
  }, [DPH])
  return {skillTitle}
}
export default useSkillTitle
