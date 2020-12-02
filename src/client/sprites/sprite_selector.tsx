import React, { lazy, Suspense } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Loading from "../util_components/loading";
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

const GenericSprite: React.FC<{ spriteName: string | undefined }> = ({
  spriteName,
}) => {
  var hero = <Loading />;
  if (spriteName) {
    switch (spriteName) {
      case "noob":
        hero = <Noob />;
        break;
      case "novice":
        hero = <Novice />;
        break;
      case "apprentice":
        hero = <Apprentice />;
        break;
      case "intermediate":
        hero = <Intermediate />;
        break;
      case "advanced":
        hero = <Advanced />;
        break;
      case "elite":
        hero = <Elite />;
        break;
      case "crab":
        hero = <Crab />;
        break;
      case "earth":
        hero = <Earth />;
        break;
      case "fire":
        hero = <Fire />;
        break;
      case "frog_man":
        hero = <FrogMan />;
        break;
      case "ice":
        hero = <Ice />;
        break;
      case "minotaur":
        hero = <Minotaur />;
        break;
      case "scorpion":
        hero = <Scorpion />;
        break;
      case "wind":
        hero = <Wind />;
        break;
    }
  }
  if (!spriteName) {
    return <Loading />;
  }
  return (
    <TouchableOpacity>
      <Suspense fallback={<Loading />}>{hero}</Suspense>
    </TouchableOpacity>
  );
};
export default GenericSprite;
