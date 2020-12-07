import React, { lazy, Suspense } from "react";
import Loading from "../util_components/loading";
import SpriteSheet from "rn-sprite-sheet";
const Novice = lazy(() => import("./novice"));
const Apprentice = lazy(() => import("./apprentice"));
const Intermediate = lazy(() => import("./intermediate"));
const Advanced = lazy(() => import("./advanced"));
const Elite = lazy(() => import("./elite"));
const Crab = lazy(() => import("./crab"));
const Earth = lazy(() => import("./earth"));
const Fire = lazy(() => import("./fire"));
const FrogMan = lazy(() => import("./frog_man"));
const Ice = lazy(() => import("./ice"));
const Minotaur = lazy(() => import("./minotaur"));
const Noob = lazy(() => import("./noob"));
const Scorpion = lazy(() => import("./scorpion"));
const Wind = lazy(() => import("./wind"));
const GenericSprite: React.FC<{ spriteName: string | undefined, aspectRatio?: number }> = ({ spriteName, aspectRatio }) => {
  var hero = <Loading />;
  var spriteRef = useRef<SpriteSheet>(null);
  if (spriteName) {
    switch (spriteName) {
      case "noob":
        hero = <Noob aspectRatio = {aspectRatio} />;
        break;
      case "novice":
        hero = <Novice aspectRatio = {aspectRatio}/>;
        break;
      case "apprentice":
        hero = <Apprentice aspectRatio = {aspectRatio}/>;
        break;
      case "intermediate":
        hero = <Intermediate aspectRatio = {aspectRatio}/>;
        break;
      case "advanced":
        hero = <Advanced aspectRatio = {aspectRatio}/>;
        break;
      case "elite":
        hero = <Elite aspectRatio = {aspectRatio}/>;
        break;
      case "Mudcrab":
        hero = <Crab aspectRatio = {aspectRatio}/>;
        break;
      case "Earth Golem":
        hero = <Earth aspectRatio = {aspectRatio}/>;
        break;
      case "Fire Devil":
        hero = <Fire aspectRatio = {aspectRatio}/>;
        break;
      case "Frogman, King of Deadlift Leverages":
        hero = <FrogMan aspectRatio = {aspectRatio}/>;
        break;
      case "Guardian of the Frost Cavern":
        hero = <Ice aspectRatio = {aspectRatio}/>;
        break;
      case "Minotaur":
        hero = <Minotaur aspectRatio = {aspectRatio}/>;
        break;
      case "Queen of Scorpions":
        hero = <Scorpion aspectRatio = {aspectRatio}/>;
        break;
      case "Defender on the Air Temple":
        hero = <Wind aspectRatio = {aspectRatio}/>;
        break;
    }
  }
  if (!spriteName) {
    return <Loading />;
  }
  return (
    <SpriteSheet
      ref={spriteRef}
      source={require("../assets/cropped_sprites/advanced.png")}
      columns={10}
      rows={3}
      height={aspectRatio ? aspectRatio * 200 : 200}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7],
        onHit: [10, 11, 12, 13],
        attack: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      }}
    />
  );
};
export default GenericSprite;
