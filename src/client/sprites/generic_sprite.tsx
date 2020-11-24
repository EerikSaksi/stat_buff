import React, {useRef} from 'react'
import SpriteSheet from 'rn-sprite-sheet'
const GenericSprite: React.FC = () => {
  const spriteRef = useRef<any>()
  return(
    <SpriteSheet
      ref={spriteRef.current}
      source={require('../../assets/Attack1.png')}
      columns={9}
      rows={6}
      imageStyle={{marginTop: -1}}
      animations={{
        attack: [0, 1, 2, 3, 4, 5, 6, 7]
      }}
    />
  )
}
export default GenericSprite
