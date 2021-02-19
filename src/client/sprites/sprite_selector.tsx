import React, { useRef, useState, useEffect, Suspense } from "react";
import Loading from "../util_components/loading";
import SpriteSheet from "rn-sprite-sheet";
import {Dimensions} from "react-native";
type Animation = "idle" | "onHit" | "attackOrDie";

//I designed the sprites to fit on a 700 pixel high phone, so ideally this scales the sprite up or down based on phone size
const { height: deviceHeight } = Dimensions.get("window");
const deviceScale = (deviceHeight / 700)
const GenericSprite: React.FC<{ spriteName: string | undefined; aspectRatio?: number; currentAnimation?: Animation; animationFinished?: () => void }> = ({ spriteName, aspectRatio, currentAnimation, animationFinished }) => {
  var ref = useRef<SpriteSheet>(null);
  const [source, setSource] = useState<number | undefined>(undefined);
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(8);
  const [height, setHeight] = useState(250);
  const [animationLengths, setAnimationLengths] = useState({ idle: 8, onHit: 4, attackOrDie: 8 });
  const [leftShift, setLeftShift] = useState(0);

  //if we have animations to complete then complete one from the queue or otherwise idle
  useEffect(() => {
    if (ref.current) {
      //if passed animation then play the animation, and then call the parent listener function (if exists)
      if (currentAnimation) {
        const resetAfterFinish = currentAnimation !== "attackOrDie";
        ref.current.play({
          type: currentAnimation,
          fps: animationLengths.attackOrDie,
          resetAfterFinish,
          onFinish: () => {
            if(animationFinished){
              animationFinished()
            }
          },
        });
      }
      //default to idle looping
      else {
        ref.current.play({
          type: "idle",
          fps: 8,
          loop: true,
        });
      }
    }
  }, [source, currentAnimation, animationLengths]);

  useEffect(() => {
    if (spriteName) {
      switch (spriteName) {
        case "noob":
          setSource(require("../assets/cropped_sprites/noob.png"));
          setRows(3);
          setCols(4);
          setAnimationLengths({ idle: 4, onHit: 4, attackOrDie: 4 });
          setLeftShift(12);
          break;
        case "novice":
          setSource(require("../assets/cropped_sprites/novice.png"));
          setRows(3);
          setCols(4);
          setLeftShift(17);
          setAnimationLengths({ idle: 4, onHit: 4, attackOrDie: 4 });
          break;
        case "apprentice":
          setSource(require("../assets/cropped_sprites/apprentice.png"));
          setRows(3);
          setCols(4);
          setHeight(450);
          setLeftShift(7);
          setAnimationLengths({ idle: 4, onHit: 4, attackOrDie: 4 });
          break;
        case "intermediate":
          setSource(require("../assets/cropped_sprites/intermediate.png"));
          setAnimationLengths({ idle: 8, onHit: 3, attackOrDie: 8 });
          setHeight(500);
          setLeftShift(20);
          setRows(3);
          setCols(8);
          break;
        case "advanced":
          setSource(require("../assets/cropped_sprites/advanced.png"));
          setRows(3);
          setCols(10);
          setHeight(380);
          setAnimationLengths({ idle: 8, onHit: 4, attackOrDie: 10 });
          break;
        case "elite":
          setSource(require("../assets/cropped_sprites/elite.png"));
          setRows(3);
          setCols(10);
          setHeight(500);
          setAnimationLengths({ idle: 10, onHit: 3, attackOrDie: 10 });
          break;
        case "Mudcrab":
          setSource(require("../assets/cropped_sprites/crab.png"));
          setHeight(100);
          setLeftShift(-3);
          break;
        case "Fire Devil":
          setSource(require("../assets/cropped_sprites/fire.png"));
          setAnimationLengths({ idle: 8, onHit: 3, attackOrDie: 7 });
          setHeight(250);
          setLeftShift(18);
          break;
        case "Earth Golem":
          setSource(require("../assets/cropped_sprites/earth.png"));
          setLeftShift(-10);
          setAnimationLengths({ idle: 8, onHit: 3, attackOrDie: 5 });
          break;
        case "Frogman, King of Deadlift Leverages":
          setSource(require("../assets/cropped_sprites/frog_man.png"));
          setHeight(220);
          setLeftShift(10);
          break;
        case "Guardian of the Frost Cavern":
          setSource(require("../assets/cropped_sprites/ice.png"));
          setHeight(220);
          setLeftShift(-5);
          setAnimationLengths({ idle: 8, onHit: 3, attackOrDie: 5 });
          break;
        case "Minotaur":
          setSource(require("../assets/cropped_sprites/minotaur.png"));
          setHeight(250);
          setLeftShift(20);
          break;
        case "Queen of Scorpions":
          setSource(require("../assets/cropped_sprites/scorpion.png"));
          break;
        case "Defender on the Air Temple":
          setSource(require("../assets/cropped_sprites/wind.png"));
          setAnimationLengths({ idle: 8, onHit: 3, attackOrDie: 5 });
          setHeight(280);
          setLeftShift(-15);
          break;
      }
    }
  }, [spriteName]);

  if (!source) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <SpriteSheet
        key = {rows + '' + cols + '' + height}
        ref={ref}
        source={source}
        columns={cols}
        rows={rows}
        imageStyle={{ left: `${leftShift}%`, }}
        height={aspectRatio ? aspectRatio * height * deviceScale : height * deviceScale}
        animations={{
          idle: Array.from({ length: animationLengths.idle }, (_, i) => i),
          onHit: Array.from({ length: animationLengths.onHit }, (_, i) => i + cols),
          attackOrDie: Array.from({ length: animationLengths.attackOrDie }, (_, i) => i + 2 * cols),
        }}
      />
    </Suspense>
  );
};

export default GenericSprite;
