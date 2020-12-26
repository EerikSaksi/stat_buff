import React from 'react'
const CreateGroup: React.FC<{visible: boolean, setVisible: (arg: boolean) => void}> = ({visible, setVisible}) => {
  return(
    <CustomModal visible = {visible}>
    </CustomModal>
  )
}
export default CreateGroup
