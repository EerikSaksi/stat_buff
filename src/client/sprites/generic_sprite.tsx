import React, {useRef, useEffect} from 'react'
import {TouchableOpacity} from 'react-native'
import SpriteSheet from 'rn-sprite-sheet'
import CenteredView from '../util_components/centered_view'
const GenericSprite: React.FC = () => {
  var spriteRef = useRef<SpriteSheet>(null)
  const animate = (options) => {
    if (spriteRef.current) {
      spriteRef.current!.play(options)
    }
  }
  const idle = () => animate({type: "idle", loop: true, fps: 10})
  const onHit = () => animate({type: "onHit", fps: 10, onFinish: () => idle()})
  useEffect(() => {
    if (spriteRef.current){
      idle()
    }
  }, [spriteRef])
  return (
    <CenteredView>
      <TouchableOpacity onPress={() => onHit()}>
        <SpriteSheet
          ref={spriteRef}
          source={require('../assets/evil_wizard.png')}
          columns={8}
          rows={4}
          height={600}
          imageStyle={{marginTop: -1}}
          animations={{
            idle: [0, 1, 2, 3, 4, 5, 6, 7],
            onHit: [8, 9, 10],
            attack1: [16, 17, 18, 19, 20, 21, 22, 23],
            attack2: [24, 25, 26, 27, 28, 29, 30, 31]
          }}
        />
      </TouchableOpacity>
    </CenteredView>
  )
}
export default GenericSprite
