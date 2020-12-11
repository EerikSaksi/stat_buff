import React, { lazy, useRef, useState, useEffect, Suspense } from "react";
import Loading from "../util_components/loading";
import SpriteSheet from "rn-sprite-sheet";

type Animation = "idle" | "onHit" | "attackOrDie";
type AnimationQueue = [Animation, number][];
const GenericSprite: React.FC<{ spriteName: string | undefined; aspectRatio?: number; animationsToComplete?: AnimationQueue; parentFinishedCallback?: () => void }> = ({ spriteName, aspectRatio, animationsToComplete, parentFinishedCallback }) => {
  var ref = useRef<SpriteSheet>(null);
  const [source, setSource] = useState<number | undefined>(undefined);
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(8);
  const [height, setHeight] = useState(250);
  const [animationLengths, setAnimationLengths] = useState({ idle: 8, onHit: 4, dieOrAttack: 8 });
  const [leftShift, setLeftShift] = useState(0);

  const [animationQueue, setAnimationQueue] = useState<AnimationQueue>([]);

  //when a parent assigns animations to complete, initialize the local queue with them
  useEffect(() => {
    console.log('ran')
    if (animationsToComplete) {
      setAnimationQueue(animationsToComplete);
    }
  }, [animationsToComplete]);

  //if we have animations to complete then complete one from the queue or otherwise idle
  useEffect(() => {
    if (animationQueue[0]) {
      const currentAnimation = animationQueue[0][0];
      ref.current?.play({
        fps: 10,
        type: currentAnimation,
        //remove the first animation
        onFinish: async () => {
          if (parentFinishedCallback) parentFinishedCallback();
          setAnimationQueue(() => {
            //if we still have left over animations of this type then reduce the count of the first element
            if (animationQueue[0][1]) {
              return animationQueue.map((animation, i) => {
                if (!i) {
                  return [animation[0], animation[1] - 1];
                }
                return animation;
              });
            }
            //otherwise remove it from the queue
            return animationQueue.filter((animation, i) => {
              if (!i) {
                return false;
              }
              return true;
            });
          });
        },
      });
    } else {
      ref.current?.play({ fps: 10, type: "idle", loop: true });
    }
  }, [source, animationQueue]);

  useEffect(() => {
    if (spriteName) {
      switch (spriteName) {
        case "noob":
          setSource(require("../assets/cropped_sprites/noob.png"));
          setRows(3);
          setCols(4);
          setAnimationLengths({ idle: 4, onHit: 4, dieOrAttack: 4 });
          setLeftShift(12);
          break;
        case "novice":
          setSource(require("../assets/cropped_sprites/novice.png"));
          setRows(3);
          setCols(4);
          setLeftShift(17);
          setAnimationLengths({ idle: 4, onHit: 4, dieOrAttack: 4 });
          break;
        case "apprentice":
          setSource(require("../assets/cropped_sprites/apprentice.png"));
          setRows(3);
          setCols(4);
          setHeight(400);
          setLeftShift(5);
          setAnimationLengths({ idle: 4, onHit: 4, dieOrAttack: 4 });
          break;
        case "intermediate":
          setSource(require("../assets/cropped_sprites/intermediate.png"));
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 8 });
          setHeight(450);
          setLeftShift(20);
          break;
        case "advanced":
          setSource(require("../assets/cropped_sprites/advanced.png"));
          setRows(3);
          setCols(10);
          setHeight(380);
          setAnimationLengths({ idle: 8, onHit: 4, dieOrAttack: 10 });
          break;
        case "elite":
          setSource(require("../assets/cropped_sprites/elite.png"));
          setRows(3);
          setCols(10);
          setHeight(500);
          setAnimationLengths({ idle: 10, onHit: 3, dieOrAttack: 10 });
          break;
        case "Mudcrab":
          setSource(require("../assets/cropped_sprites/crab.png"));
          setHeight(200);
          setLeftShift(-3);
          break;
        case "Fire Devil":
          setSource(require("../assets/cropped_sprites/fire.png"));
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 7 });
          setHeight(300);
          setLeftShift(18);
          break;
        case "Earth Golem":
          setSource(require("../assets/cropped_sprites/earth.png"));
          setLeftShift(-3);
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 5 });
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
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 5 });
          break;
        case "Minotaur":
          setSource(require("../assets/cropped_sprites/minotaur.png"));
          setHeight(300);
          setLeftShift(20);
          break;
        case "Queen of Scorpions":
          setSource(require("../assets/cropped_sprites/scorpion.png"));
          break;
        case "Defender on the Air Temple":
          setSource(require("../assets/cropped_sprites/wind.png"));
          setAnimationLengths({ idle: 8, onHit: 3, dieOrAttack: 5 });
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
        ref={ref}
        source={source}
        columns={cols}
        rows={rows}
        height={aspectRatio ? aspectRatio * height : height}
        imageStyle={{ left: `${leftShift}%` }}
        animations={{
          idle: Array.from({ length: animationLengths.idle }, (v, i) => i),
          onHit: Array.from({ length: animationLengths.onHit }, (v, i) => i + cols),
          attackOrDie: Array.from({ length: animationLengths.dieOrAttack }, (v, i) => i + 2 * cols),
        }}
      />
    </Suspense>
  );
};
export default GenericSprite;
