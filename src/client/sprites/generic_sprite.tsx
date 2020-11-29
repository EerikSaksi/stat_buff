import React, {useRef, useEffect, useState} from 'react'
import {TouchableOpacity, ViewStyle} from 'react-native'
import SpriteSheet from 'rn-sprite-sheet'
import Loading from '../util_components/loading'
const GenericSprite: React.FC<{skillTitle: string | undefined}> = ({skillTitle}) => {
  const [source, setSource] = useState<undefined | string>(undefined)
  useEffect(() => {
    if (skillTitle){
      console.log('l')
      switch(skillTitle){
        case "noob":
          setSource(require('../assets/sprites/noob.png'))
          break
        case "novice":
          setSource(require('../assets/sprites/novice.png'))
          break
        case "apprentice":
          setSource(require('../assets/sprites/apprentice.png'))
          break
        case "intermediate":
          setSource(require('../assets/sprites/intermediate.png'))
          break
        case "advanced":
          setSource(require('../assets/sprites/advanced.png'))
          break
        case "elite":
          setSource(require('../assets/sprites/elite.png'))
          break
      }
    }
  }, [skillTitle])
  var spriteRef = useRef<SpriteSheet>(null)
  const animate = (options) => {
    if (spriteRef.current) {
      spriteRef.current!.play(options)
    }
  }
  const idle = () => animate({type: "idle", loop: true, fps: 10})
  const onHit = () => animate({type: "onHit", fps: 10, onFinish: () => idle()})
  useEffect(() => {
    if (spriteRef.current) {
      idle()
    }
  }, [spriteRef])
  return (
    source 
    ? 
    <TouchableOpacity onPress={() => onHit()}>
      <SpriteSheet
        ref={spriteRef}
        source={source}
        columns={8}
        rows={4}
        viewStyle={{marginTop: '-45%', marginBottom: '-145%',}}
        height={1000}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7],
          onHit: [8, 9, 10],
          attack1: [16, 17, 18, 19, 20, 21, 22, 23],
          attack2: [24, 25, 26, 27, 28, 29, 30, 31]
        }}
      />
    </TouchableOpacity>
    : <Loading/>
  )
}
export default GenericSprite
