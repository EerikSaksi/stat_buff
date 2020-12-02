import React, {useRef} from 'react'
import SpriteSheet from 'rn-sprite-sheet'
import useSpriteController from '../hooks/use_sprite_controller'

const Novice: React.FC = () => {
  var spriteRef = useRef<SpriteSheet>(null)
  useSpriteController(spriteRef)
  return (
    < SpriteSheet
      source={require('../assets/sprites/novice.png')}
      ref={spriteRef}
      columns={4}
      rows={3}
      height={800}
      viewStyle={{marginTop: '-45%', marginBottom: '-105%', marginLeft: '-6%'}}
      animations={{
        idle: [0, 1, 2, 3],
        onHit: [4, 5, 6, 7],
        attack: [8, 9, 10, 11],
      }
      }
    />
  )
}
export default Novice