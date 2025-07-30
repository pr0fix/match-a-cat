import { LuRotateCcw } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import useArrowKeys from "../hooks/useArrowKeys";
import { useCardStore } from "../stores/cardStore";

const UndoButton = () => {
  const triggerUndo = useCardStore((state) => state.triggerUndo);

  return (
    <div
      id="undo-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
      onClick={triggerUndo}
    >
      <LuRotateCcw className="w-10 h-10 text-orange-400" />
    </div>
  );
};

const DislikeButton = () => {
  const triggerDislike = useCardStore((state) => state.triggerDislike);

  return (
    <div
      id="dislike-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
      onClick={triggerDislike}
    >
      <FaXmark className="w-10 h-10 text-red-600" />
    </div>
  );
};

const LikeButton = () => {
  const triggerLike = useCardStore((state) => state.triggerLike);

  return (
    <div
      id="like-button"
      className="border-2 border-black w-16 h-16 rounded-full bg-white flex items-center justify-center"
      onClick={triggerLike}
    >
      <IoCheckmarkSharp className="w-10 h-10 text-green-600" />
    </div>
  );
};

const Buttons = () => {
  useArrowKeys();

  return (
    <div className="flex gap-4 justify-around absolute -bottom-8 left-0 right-0">
      <UndoButton />
      <DislikeButton />
      <LikeButton />
    </div>
  );
};

export default Buttons;
