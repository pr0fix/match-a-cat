import { motion, useAnimation } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Buttons from "./Buttons";
import Instruction from "./Instruction";
import { useCardStore } from "../stores/cardStore";
import { useEffect } from "react";
import type { Card } from "../utils/types";

interface CardProps {
  card: Card;
}

const CardItem = ({ card }: CardProps) => {
  const controls = useAnimation();
  const {
    setControls,
    triggerLike,
    triggerDislike,
    undoPending,
    lastUndoAction,
  } = useCardStore();

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

      useCardStore.setState({ undoPending: false, lastUndoAction: null });
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
    <div className="flex justify-center items-center min-h-screen flex-col">
      <motion.div
        className="border-2 border-black rounded-md bg-amber-50 w-72 h-[450px] relative"
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
          src={card.imageUrl}
          className="rounded-t-sm w-full h-[300px] object-cover"
          id="card-img"
          style={{ pointerEvents: "none" }}
          alt={`${card.name} the cat`}
        />
        <div className="flex gap-2 m-4 mb-2 items-baseline" id="name-container">
          <h1>{card.name ? card.name : "Cat McKattington"}</h1>
          <h2>{card.age ? card.age : "20"} </h2>
        </div>
        <div id="info-container" className="flex gap-4 text-[12px] ml-4">
          <p id="state-address" className="font-semibold">
            {card.location ? card.location : "Texas"}
          </p>
          <p id="breed">{card.breed}</p>
          <p id="gender">{card.gender ? card.gender : "Male"}</p>
        </div>
        <Buttons />
      </motion.div>
      <Instruction />
    </div>
  );
};

export default CardItem;
