import React, {useRef, useEffect} from 'react'
import SpriteSheet from 'rn-sprite-sheet'
import {SafeAreaView, KeyboardAvoidingView, View} from 'react-native'
const GenericSprite: React.FC = () => {
  var spriteRef = useRef<SpriteSheet>(null)

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.play({
        type: 'walk',
        fps: 10,
        loop: true,
        onFinish: () => console.log('hi')
      });
    }
  }, [spriteRef])
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SpriteSheet
            ref={spriteRef}
            source={require('../assets/Attack1.png')}
            columns={8}
            rows={1}
            // height={200} // set either, none, but not both
            // width={200}
            // frameHeight={50} // manually set size of your sprite
            // frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
            // offsetX={0}
            // offsetY={0}
            imageStyle={{marginTop: -1}}
            animations={{
              walk: [0, 1, 2, 3, 4, 5, 6, 78],
                //appear: Array.from({length: 15}, (v, i) => i + 18),
                //die: Array.from({length: 21}, (v, i) => i + 33),
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export default GenericSprite
