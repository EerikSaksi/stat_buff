import React, { useRef} from "react";
import SpriteSheet from "rn-sprite-sheet";
import useSpriteController from "../hooks/use_sprite_controller";

const Elite = () => {
  var spriteRef = useRef<SpriteSheet>(null);
  useSpriteController(spriteRef);
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/sprites/elite.png")}
      columns={10}
      rows={3}
      imageStyle={{top: '34%', right: '8%'}}
      height={900}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        onHit: [10, 11, 12],
        attack2: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      }}
    />
  );
};
export default Elite;
