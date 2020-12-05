import React, { useRef } from "react";
import SpriteSheet from "rn-sprite-sheet";
import useSpriteController from "../hooks/use_sprite_controller";

const Minotaur = () => {
  var spriteRef = useRef<SpriteSheet>(null);
  useSpriteController(spriteRef);
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/sprites/minotaur.png")}
      columns={8}
      rows={3}
      viewStyle={{
        top: '23%'
      }}
      height={600}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7],
        onHit: [8, 9, 10, 11],
        death: [16, 17, 18, 19, 20, 21, 22, 23],
      }}
    />
  );
};
export default Minotaur;
