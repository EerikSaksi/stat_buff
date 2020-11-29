import React, { useRef} from "react";
import SpriteSheet from "rn-sprite-sheet";
import useSpriteController from "../hooks/use_sprite_controller";

const Apprentice = () => {
  var spriteRef = useRef<SpriteSheet>(null);
  useSpriteController(spriteRef);
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/sprites/apprentice.png")}
      columns={4}
      rows={3}
      height={800}
      viewStyle={{marginTop: '-45%', marginBottom: '-105%', }}
      animations={{
        idle: [0, 1, 2, 3],
        onHit: [4, 5, 6, 7],
        attack: [8, 9, 10, 11],
      }}
    />
  );
};
export default Apprentice;
