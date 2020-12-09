import React, { lazy, useRef, useState, useEffect, Suspense } from "react";
import Loading from "../util_components/loading";
import SpriteSheet from "rn-sprite-sheet";
const GenericSprite: React.FC<{ spriteName: string | undefined; aspectRatio?: number }> = ({ spriteName, aspectRatio }) => {
  var ref = useRef<SpriteSheet>(null);
  //useSpriteController(spriteRef);
  const [source, setSource] = useState<number | undefined>(undefined);
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(8);
  const [height, setHeight] = useState(250)
  const [animationLengths, setAnimationLengths] = useState({ idle: 8, onHit: 4, dieOrAttack: 8 });
  const [leftShift, setLeftShift] = useState(0)

  useEffect(() => {
    if (spriteName) {
      switch (spriteName) {
        case "noob":
          setSource(require("../assets/cropped_sprites/noob.png"));
          setRows(3);
          setCols(4);
          setAnimationLengths({ idle: 4, onHit: 4, dieOrAttack: 4 });
          setLeftShift(12)
          break;
        case "novice":
          setSource(require("../assets/cropped_sprites/novice.png"));
          setRows(3);
          setCols(4);
          setLeftShift(17)
          setAnimationLengths({ idle: 4, onHit: 4, dieOrAttack: 4 });
          break;
        case "apprentice":
          setSource(require("../assets/cropped_sprites/apprentice.png"));
          setRows(3);
          setCols(4);
          setHeight(400)
          setLeftShift(5)
          setAnimationLengths({ idle: 4, onHit: 4, dieOrAttack: 4 });
          break;
        case "intermediate":
          setSource(require("../assets/cropped_sprites/intermediate.png"));
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 8 });
          setHeight(450)
          setLeftShift(20)
          break;
        case "advanced":
          setSource(require("../assets/cropped_sprites/advanced.png"));
          setRows(3);
          setCols(10);
          setHeight(380)
          setAnimationLengths({ idle: 8, onHit: 4, dieOrAttack: 10 });
          break;
        case "elite":
          setSource(require("../assets/cropped_sprites/elite.png"));
          setRows(3);
          setCols(10);
          setHeight(500)
          setAnimationLengths({ idle: 10, onHit: 3, dieOrAttack: 10 });
          break;
        case "Mudcrab":
          setSource(require("../assets/cropped_sprites/crab.png"));
          setHeight(200)
          setLeftShift(-3)
          break;
        case "Fire Devil":
          setSource(require("../assets/cropped_sprites/fire.png"));
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 7 });
          setHeight(300)
          setLeftShift(18)
          break;
        case "Earth Golem":
          setSource(require("../assets/cropped_sprites/earth.png"));
          setLeftShift(-3)
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 5 });
          break;
        case "Frogman, King of Deadlift Leverages":
          setSource(require("../assets/cropped_sprites/frog_man.png"));
          setHeight(220)
          setLeftShift(10)
          break;
        case "Guardian of the Frost Cavern":
          setSource(require("../assets/cropped_sprites/ice.png"));
          setHeight(220)
          setLeftShift(-5)
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 5 });
          break;
        case "Minotaur":
          setSource(require("../assets/cropped_sprites/minotaur.png"));
          setHeight(300)
          setLeftShift(20)
          break;
        case "Queen of Scorpions":
          setSource(require("../assets/cropped_sprites/scorpion.png"));
          break;
        case "Defender on the Air Temple":
          setSource(require("../assets/cropped_sprites/wind.png"));
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 5 });
          setHeight(280)
          setLeftShift(-15)
          break;
      }
    }
  }, [spriteName]);

  //once the source has loaded we can start playing
  useEffect(() => {
    ref.current?.play({ fps: 10, type: "idle", loop: true });
  }, [source]);

  if (!source) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <SpriteSheet
        ref={ref}
        source={source}
        columns={cols}
        rows={rows}
        height={aspectRatio ? aspectRatio * height : height}
        imageStyle = {{left: `${leftShift}%`}}
        animations={{
          idle: Array.from({ length: animationLengths.idle }, (v, i) => i),
          onHit: Array.from({ length: animationLengths.onHit }, (v, i) => i + rows),
          attackOrDie: Array.from({ length: animationLengths.dieOrAttack }, (v, i) => i + 2 * rows),
        }}
      />
    </Suspense>
  );
};
export default GenericSprite;
