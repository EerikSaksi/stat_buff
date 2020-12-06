import React, {useEffect} from 'react'
import SpriteSheet from 'rn-sprite-sheet'
const useSpriteController = (ref: React.RefObject<SpriteSheet>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.play({fps: 10, type: 'onHit', loop: true})
    }
  }, [ref])
}
export default useSpriteController
