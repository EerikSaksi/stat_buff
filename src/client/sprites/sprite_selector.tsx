import React, { useEffect, useState, lazy, Suspense } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Loading from "../util_components/loading";
import Noob from "./noob"
const Novice = lazy(() => import("./novice"));
const Apprentice = lazy(() => import("./apprentice"));
const Intermediate = lazy(() => import("./intermediate"));
const Advanced = lazy(() => import("./advanced"));
const Elite = lazy(() => import("./elite"));
const GenericSprite: React.FC<{ skillTitle: string | undefined }> = ({
  skillTitle,
}) => {
  var hero = <Loading />;
  if (skillTitle) {
    switch (skillTitle) {
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
    }
  }
  if (!skillTitle){
    return (<Loading/>)
  }
  return (
    <TouchableOpacity>
      <Suspense fallback = {<Loading/>}>{hero}</Suspense>
    </TouchableOpacity>
  );
};
export default GenericSprite;
