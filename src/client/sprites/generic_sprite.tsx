import React, {useRef, useEffect} from 'react'
import SpriteSheet from 'rn-sprite-sheet'
const GenericSprite: React.FC = () => {
  var spriteRef = useRef<SpriteSheet>(null)

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.play({type: 'attack', fps: 10, })
    }
  }, [spriteRef])
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require('../assets/Attack1.png')}
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
