import { LuRotateCcw } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import useArrowKeys from "../hooks/useArrowKeys";

const onButtonClick = (btnType: string) => {
  if (btnType === "undo") {
    console.log("you clicked Undo");
    // go back to previous card
  } else if (btnType === "dislike") {
    // move current card to current user's disliked list to not show it again
    console.log("you clicked Nope");
  } else if (btnType === "like") {
    console.log("you clicked Like");
    // move current card to current user's liked list,
    // and possibly add to matches if both like each other
  }
};

const UndoButton = () => {
  return (
    <div
      id="undo-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
      onClick={() => onButtonClick("undo")}
    >
      <LuRotateCcw className="w-10 h-10 text-orange-400" />
    </div>
  );
};

const DislikeButton = () => {
  return (
    <div
      id="dislike-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
      onClick={() => onButtonClick("dislike")}
    >
      <FaXmark className="w-10 h-10 text-red-600" />
    </div>
  );
};

const LikeButton = () => {
  return (
    <div
      id="like-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
      onClick={() => onButtonClick("like")}
    >
      <IoCheckmarkSharp className="w-10 h-10 text-green-600" />
    </div>
  );
};

const Buttons = () => {
  useArrowKeys(onButtonClick);
  
  return (
    <div className="flex gap-4 justify-around absolute -bottom-8 left-0 right-0">
      <UndoButton />
      <DislikeButton />
      <LikeButton />
    </div>
  );
};

export default Buttons;
