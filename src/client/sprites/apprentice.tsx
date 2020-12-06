import React, { useRef} from "react";
import SpriteSheet from "rn-sprite-sheet";
import useSpriteController from "../hooks/use_sprite_controller";

const Apprentice: React.FC<{aspectRatio: number | undefined}> = ({aspectRatio}) => {
  var spriteRef = useRef<SpriteSheet>(null);
  useSpriteController(spriteRef);
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/sprites/apprentice.png")}
      columns={4}
      rows={3}
      height={aspectRatio ? aspectRatio * 800 : 800}
      animations={{
        idle: [0, 1, 2, 3],
        onHit: [4, 5, 6, 7],
        attack: [8, 9, 10, 11],
      }}
      viewStyle = {{ backgroundColor: 'blue'}}
      frameHeight = {100}
      frameWidth = {50}
      offsetX = {160}
      offsetY = {20}
    />
  );
};
export default Apprentice;
