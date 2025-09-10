import { useEffect } from "react";
import cats from "../cats.json";

const Collection: React.FC = () => {
  useEffect(() => {
    const handleFetchCollection = async () => {
      
    };
  });
  return (
    <div className="flex flex-col p-4 md:p-6 mt-6 md:mt-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {cats.map((cat, index) => (
          <div
            key={index}
            className="border-2 border-black rounded-md w-full aspect-[6/7] relative"
            id="card"
          >
            <img
              src={cat.image}
              className="rounded-t-sm w-full h-[70%] object-cover"
              id="card-img"
              style={{ pointerEvents: "none" }}
              alt={`${cat.name} the cat`}
            />
            <div
              className="flex gap-2 m-3 mb-2 items-baseline"
              id="name-container"
            >
              <h1 className="text-lg font-bold">{cat.name}</h1>
              <h2 className="text-base">{cat.age}</h2>
            </div>
            <div id="info-container" className="flex gap-3 text-xs ml-3">
              <p id="state-address" className="font-semibold">
                {cat.city}, {cat.state}
              </p>
              <p id="breed">{cat.breed}</p>
              <p id="gender">{cat.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
