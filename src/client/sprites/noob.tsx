import React from 'react'
import SpriteSheet from 'rn-sprite-sheet'

const Noob = React.forwardRef<ref: any>(ref) => {
    <SpriteSheet
      source={require('../assets/sprites/noob.png')}
      ref = {ref}
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
}
export default Noob
