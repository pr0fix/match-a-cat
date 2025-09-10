import { motion, useAnimation } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Buttons from "./Buttons";
import Instruction from "./Instruction";
import { useCatStore } from "../stores/catStore";
import { useEffect } from "react";
import type { Cat } from "../utils/types";

interface CardProps {
  catCard: Cat;
}

const CardItem = ({ catCard }: CardProps) => {
  const controls = useAnimation();
  const {
    setControls,
    triggerLike,
    triggerDislike,
    undoPending,
    lastUndoAction,
  } = useCatStore();

  // Set controls in the store when the component mounts
  useEffect(() => {
    setControls(controls);
  }, [controls, setControls]);

  // Sets the animation of card items
  useEffect(() => {
    if (undoPending && lastUndoAction) {
      controls.set({
        x: lastUndoAction === "like" ? 150 : -150,
        opacity: 0,
        rotateZ: lastUndoAction === "like" ? 30 : -30,
      });

      controls.start({
        x: 0,
        opacity: 1,
        rotateZ: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      });

      useCatStore.setState({ undoPending: false, lastUndoAction: null });
    }
  }, [controls, undoPending, lastUndoAction]);

  const handleDragEnd = (_event: MouseEvent, info: PanInfo) => {
    const threshold = 60;

    // Right swipe (like)
    if (info.offset.x > threshold) {
      triggerLike();
    }
    // Left swipe (dislike)
    else if (info.offset.x < -threshold) {
      triggerDislike();
    } else {
      // Return to center with a spring effect
      controls.start({
        x: 0,
        opacity: 1,
        rotateZ: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col w-full">
      <motion.div
        className="border-2 border-black rounded-md w-full max-w-sm aspect-[7/10] relative"
        id="card"
        drag="x"
        dragConstraints={{ left: -60, right: 60 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{ scale: 1.03 }}
        dragElastic={0.2}
        dragTransition={{ power: 0.2 }}
        dragMomentum={false}
        whileHover={{ cursor: "grab" }}
        style={{ x: 0 }}
        onDrag={(_, info) => {
          const maxRotation = 30;
          const rotationFactor = 0.1;

          let rotateAngle = info.offset.x * rotationFactor;

          if (rotateAngle > maxRotation) rotateAngle = maxRotation;
          if (rotateAngle < -maxRotation) rotateAngle = -maxRotation;

          controls.start({ rotateZ: rotateAngle }, { duration: 0 });
        }}
      >
        <img
          src={catCard.imageUrl}
          className="rounded-t-sm w-full h-[60%] object-cover"
          id="card-img"
          style={{ pointerEvents: "none" }}
          alt={`${catCard.name} the cat`}
        />
        <div className="flex gap-2 m-4 mb-2 items-baseline" id="name-container">
          <h1 className="text-lg md:text-xl font-bold">
            {catCard.name ? catCard.name : "Cat McKattington"}
          </h1>
          <h2 className="text-base md:text-lg">
            {catCard.age ? catCard.age : "20"}{" "}
          </h2>
        </div>
        <div id="info-container" className="flex gap-4 text-xs md:text-sm ml-4">
          <p id="state-address" className="font-semibold">
            {catCard.location ? catCard.location : "Texas"}
          </p>
          <p id="breed">{catCard.breed}</p>
          <p id="gender">{catCard.gender ? catCard.gender : "Male"}</p>
        </div>
        <Buttons />
      </motion.div>
      <Instruction />
    </div>
  );
};

export default CardItem;
