import React, { useRef} from "react";
import SpriteSheet from "rn-sprite-sheet";
import useSpriteController from "../hooks/use_sprite_controller";

const Advanced = () => {
  var spriteRef = useRef<SpriteSheet>(null);
  useSpriteController(spriteRef);
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/sprites/advanced.png")}
      columns={10}
      rows={3}
      viewStyle={{ marginTop: "-45%", marginBottom: "-88%", marginLeft: '-25%' }}
      height={800}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7],
        onHit: [10, 11, 12, 13],
        attack: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      }}
    />
  );
};
export default Advanced;
