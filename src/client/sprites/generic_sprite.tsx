import React, {useRef, useEffect} from 'react'
import {TouchableOpacity, ViewStyle} from 'react-native'
import SpriteSheet from 'rn-sprite-sheet'
const GenericSprite: React.FC = () => {
  var spriteRef = useRef<SpriteSheet>(null)
  const animate = (options) => {
    if (spriteRef.current) {
      spriteRef.current!.play(options)
    }
  }
  const idle = () => animate({type: "attack2", loop: true, fps: 10})
  const onHit = () => animate({type: "onHit", fps: 10, onFinish: () => idle()})
  useEffect(() => {
    if (spriteRef.current) {
      idle()
    }
  }, [spriteRef])
  return (
    <TouchableOpacity style={{backgroundColor: 'blue', }} onPress={() => onHit()}>
      <SpriteSheet
        ref={spriteRef}
        source={require('../assets/evil_wizard.png')}
        columns={8}
        rows={4}
        viewStyle={{marginTop: '-45%', marginBottom: '-68%',}}
        height={600}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7],
          onHit: [8, 9, 10],
          attack1: [16, 17, 18, 19, 20, 21, 22, 23],
          attack2: [24, 25, 26, 27, 28, 29, 30, 31]
        }}
      />
    </TouchableOpacity>
  )
}
export default GenericSprite
