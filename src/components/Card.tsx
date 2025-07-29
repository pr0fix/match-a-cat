import Buttons from "./Buttons";
import Instruction from "./Instruction";

const Card = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div
        className="border-2 border-black rounded-md bg-amber-50 w-72 h-[450px] relative"
        id="card"
      >
        <img
          src="src/assets/cat_1.png"
          className="rounded-t-sm"
          id="card-img"
        />
        <div className="flex gap-2 m-4 mb-2 items-baseline" id="name-container">
          <h1>Hermione</h1>
          <h2>3</h2>
          <p className="text-gray-500 text-[10px]">Kitten</p>
        </div>
        <div id="info-container" className="flex gap-4 text-[12px] ml-4">
          <p id="state-address" className="font-semibold">
            Austin, TX
          </p>
          <p id="breed">Orange Tabby</p>
          <p id="gender">Male</p>
        </div>
        <Buttons />
      </div>
      <div className="mt-12 bg-[#EDE8D0]">
        <Instruction />
      </div>
    </div>
  );
};

export default Card;
