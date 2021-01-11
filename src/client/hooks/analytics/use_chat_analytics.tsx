import {useReactiveVar} from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {visibleSection} from '../../apollo/cache'
const useChatAnalytics: React.FC<{chatModalVisible: boolean}> = ({chatModalVisible}) => {
  const vs = useReactiveVar(visibleSection)
  //we need to store the last group tab we were on, as we need to set it back if we close the chat
  const [lastGroupTab, setLastGroupTab] = useState<undefined | string>()
  useEffect(() => {
    if (vs === "Enemy"){
      setLastGroupTab("Enemy")
    } 
    else if ( vs === "Members") {
      setLastGroupTab("Members")
    }
  }, [vs])

  useEffect(() => {
    //if the chat is closed but we have been on the group before recover the last group tab
    if (chatModalVisible){
      visibleSection('chatModalVisible')
    }
    else if (lastGroupTab){
      visibleSection(lastGroupTab)
    }
  }, [chatModalVisible, lastGroupTab])

  return null
}
export default useChatAnalytics
