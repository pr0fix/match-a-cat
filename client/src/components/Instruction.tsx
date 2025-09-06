import { FaArrowLeft, FaArrowRight, FaArrowDown } from "react-icons/fa6";

const Nope: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <div
        id="left-arrow-container"
        className="flex items-center justify-center w-8 h-[20px] border-[1.5px] border-[var(--primary-950)] rounded-md"
      >
        <FaArrowLeft className="text-xs text-[var(--text-950)]" />
      </div>
      <span className="text-[16px] ml-1 font-semibold text-[var(--text-950)]">
        Nope
      </span>
    </div>
  );
};

const Like: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <div
        id="right-arrow-container"
        className="flex items-center justify-center w-8 h-[20px] border-[1.5px] border-[var(--primary-950)] rounded-md"
      >
        <FaArrowRight className="text-sm text-[var(--text-950)]" />
      </div>
      <span className="text-[16px] ml-1 font-semibold text-[var(--text-950)]">
        Like
      </span>
    </div>
  );
};

const Undo: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <div
        id="down-arrow-container"
        className="flex items-center justify-center w-8 h-[20px] border-[1.5px] border-[var(--primary-950)] rounded-md"
      >
        <FaArrowDown className="text-xs text-[var(--text-950)]" />
      </div>
      <span className="text-[16px] ml-1 font-semibold text-[var(--text-950)]">
        Undo
      </span>
    </div>
  );
};

const Instruction: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-80 h-10 border border-[var(--primary-950)] rounded-full px-4 mt-12 shadow-md">
      <Undo />
      <Nope />
      <Like />
    </div>
  );
};

export default Instruction;
