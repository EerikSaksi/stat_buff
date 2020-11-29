import React, {useEffect, useState} from 'react'
const useSkillTitle = (percentage: number | undefined) => {
  const [skillTitle, setSkillTitle] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (!percentage){
      setSkillTitle("noob")
    }
    else {
      var newSkill = "novice"
      if (20 < percentage && percentage <= 40) {
        newSkill = "apprentice"
      }
      else if (40 < percentage && percentage <= 60) {
        newSkill = "intermediate"
      }
      else if (60 < percentage && percentage <= 80) {
        newSkill = "advanced"
      }
      else {
        newSkill = "elite"
      }
      setSkillTitle(newSkill)
    }
  }, [percentage])
  return {skillTitle}
}
export default useSkillTitle
