import React, { lazy, useRef, useState, useEffect, Suspense } from "react";
import Loading from "../util_components/loading";
const SpriteSheet = lazy(() => import("rn-sprite-sheet"));
const GenericSprite: React.FC<{ spriteName: string | undefined; aspectRatio?: number }> = ({ spriteName, aspectRatio }) => {
  var spriteRef = useRef<SpriteSheet>(null);
  //useSpriteController(spriteRef);
  const [source, setSource] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (spriteName) {
      switch (spriteName) {
        case "noob":
          setSource(require("../assets/cropped_sprites/noob.png"));
          break;
        case "novice":
          setSource(require("../assets/cropped_sprites/novice.png"));
          break;
        case "apprentice":
          setSource(require("../assets/cropped_sprites/apprentice.png"));
          break;
        case "intermediate":
          setSource(require("../assets/cropped_sprites/intermediate.png"));
          break;
        case "advanced":
          setSource(require("../assets/cropped_sprites/advanced.png"));
          break;
        case "elite":
          setSource(require("../assets/cropped_sprites/elite.png"));
          break;
        case "Mudcrab":
          setSource(require("../assets/cropped_sprites/crab.png"));
          break;
        case "Earth Golem":
          setSource(require("../assets/cropped_sprites/earth.png"));
          break;
        case "Frogman, King of Deadlift Leverages":
          setSource(require("../assets/cropped_sprites/frog_man.png"));
          break;
        case "Guardian of the Frost Cavern":
          setSource(require("../assets/cropped_sprites/ice.png"));
          break;
        case "Minotaur":
          setSource(require("../assets/cropped_sprites/minotaur.png"));
          break;
        case "Queen of Scorpions":
          setSource(require("../assets/cropped_sprites/scorpion.png"));
          break;
        case "Defender on the Air Temple":
          setSource(require("../assets/cropped_sprites/wind.png"));
          break;
      }
    }
  }, [spriteName]);
  useEffect(() => {
    if (spriteRef.current && spriteRef.current.play) {
      spriteRef.current.play({ fps: 10, type: "idle", loop: true });
    }
  }, [spriteRef]);

  if (!source) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <SpriteSheet
        ref={spriteRef}
        source={source}
        columns={10}
        rows={3}
        height={aspectRatio ? aspectRatio * 200 : 200}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7],
          onHit: [10, 11, 12, 13],
          attack: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        }}
      />
    </Suspense>
  );
};
export default GenericSprite;
