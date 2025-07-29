import { LuRotateCcw } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";

const UndoButton = () => {

  const onUndoClick = () => {
    
  }

  return (
    <div
      id="undo-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
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
    >
      <IoCheckmarkSharp className="w-10 h-10 text-green-600" />
    </div>
  );
};

const Buttons = () => {
  return (
    <div className="flex gap-4 justify-around absolute -bottom-8 left-0 right-0">
      <UndoButton />
      <DislikeButton />
      <LikeButton />
    </div>
  );
};

export default Buttons;
