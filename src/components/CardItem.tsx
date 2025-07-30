import { motion, useAnimation } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Buttons from "./Buttons";
import Instruction from "./Instruction";
import { useCardStore } from "../stores/cardstore";
import { useEffect } from "react";
import type { Card } from "../types";

interface CardProps {
  card: Card;
  onSwipeComplete: () => void;
}

const CardItem = ({ card, onSwipeComplete }: CardProps) => {
  const controls = useAnimation();
  const { setControls, triggerLike, triggerDislike } = useCardStore();
  console.log(card);
  // Set controls in the store when the component mounts
  useEffect(() => {
    setControls(controls);
  }, [controls, setControls]);

  const handleDragEnd = (_event: MouseEvent, info: PanInfo) => {
    const threshold = 60;

    // Right swipe (like)
    if (info.offset.x > threshold) {
      triggerLike();
      setTimeout(onSwipeComplete, 300);
    }
    // Left swipe (dislike)
    else if (info.offset.x < -threshold) {
      triggerDislike();
      setTimeout(onSwipeComplete, 300);
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
          src={card.catImage}
          className="rounded-t-sm"
          id="card-img"
          style={{ pointerEvents: "none" }}
          alt={`${card.name} the cat`}
        />
        <div className="flex gap-2 m-4 mb-2 items-baseline" id="name-container">
          <h1>{card.name}</h1>
          <h2>{card.age}</h2>
          <p className="text-gray-500 text-[10px]">{card.type}</p>
        </div>
        <div id="info-container" className="flex gap-4 text-[12px] ml-4">
          <p id="state-address" className="font-semibold">
            {card.location}
          </p>
          <p id="breed">{card.breed}</p>
          <p id="gender">{card.gender}</p>
        </div>
        <Buttons />
      </motion.div>
      <div className="mt-12 bg-[#EDE8D0]">
        <Instruction />
      </div>
    </div>
  );
};

export default CardItem;
