import React, {useEffect, useState} from 'react'
const useSkillTitle = (percentage: number | undefined) => {
  const [skillTitle, setSkillTitle] = useState("")
  useEffect(() => {
    if (percentage) {
      var newSkill = "Noob"
      if (0 < percentage && percentage <= 20) {
        newSkill = "novice"
      }
      else if (20 < percentage && percentage <= 40) {
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
