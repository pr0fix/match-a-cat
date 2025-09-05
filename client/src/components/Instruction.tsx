import { FaArrowLeft, FaArrowRight, FaArrowDown } from "react-icons/fa6";

const Nope = () => {
  return (
    <div className="flex items-center gap-1">
      <div
        id="left-arrow-container"
        className="flex items-center justify-center bg-white w-8 h-[20px] border-[1.5px] border-black rounded-sm"
      >
        <FaArrowLeft className="text-xs text-black" />
      </div>
      <span className="text-[10px] ml-1 font-semibold">Nope</span>
    </div>
  );
};

const Like = () => {
  return (
    <div className="flex items-center gap-1">
      <div
        id="right-arrow-container"
        className="flex items-center justify-center bg-white w-8 h-[20px] border-[1.5px] border-black rounded-sm"
      >
        <FaArrowRight className="text-xs text-black" />
      </div>
      <span className="text-[10px] ml-1 font-semibold">Like</span>
    </div>
  );
};

const Undo = () => {
  return (
    <div className="flex items-center gap-1">
      <div
        id="down-arrow-container"
        className="flex items-center justify-center bg-white w-8 h-[20px] border-[1.5px] border-black rounded-sm"
      >
        <FaArrowDown className="text-xs text-black" />
      </div>
      <span className="text-[10px] ml-1 font-semibold">Undo</span>
    </div>
  );
};

const Instruction = () => {
  return (
    <div className="flex justify-between items-center w-72 h-10 bg-amber-50 border-2 border-black rounded-full px-4 mt-12">
      <Undo />
      <Nope />
      <Like />
    </div>
  );
};
export default Instruction;
