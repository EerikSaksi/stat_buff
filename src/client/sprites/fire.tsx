import React, { useRef } from "react";
import SpriteSheet from "rn-sprite-sheet";
import useSpriteController from "../hooks/use_sprite_controller";

const Fire = () => {
  var spriteRef = useRef<SpriteSheet>(null);
  useSpriteController(spriteRef);
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/sprites/fire.png")}
      columns={8}
      rows={3}
      viewStyle={{
        top: '36%',
        right: '2%'
      }}
      height={850}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7],
        onHit: [8, 9, 10],
        death: [16, 17, 18, 19, 20],
      }}
    />
  );
};
export default Fire;
