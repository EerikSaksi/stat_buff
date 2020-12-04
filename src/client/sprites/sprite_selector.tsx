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
      case "Mudcrab":
        hero = <Crab />;
        break;
      case "Earth Golem":
        hero = <Earth />;
        break;
      case "Fire Devil":
        hero = <Fire/>;
        break;
      case "Frogman, King of Deadlift Leverages":
        hero = <FrogMan />;
        break;
      case "Guardian of the Frost Cavern":
        hero = <Ice />;
        break;
      case "Minotaur":
        hero = <Minotaur />;
        break;
      case "Queen of Scorpions":
        hero = <Scorpion />;
        break;
      case "Defender on the Air Temple":
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
