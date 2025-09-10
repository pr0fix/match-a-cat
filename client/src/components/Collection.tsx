import cats from "../cats.json";

const Collection: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="mt-4.5 ml-10 text-3xl">Collection</h1>
      <div className="flex flex-col md:flex-row gap-6 md:mt-5 md:ml-10">
        {cats.map((cat) => (
          <div
            className="border-2 border-black rounded-md w-[300px] h-[350px] relative"
            id="card"
          >
            <img
              src={cat.image}
              className="rounded-t-sm w-full h-[250px] object-cover"
              id="card-img"
              style={{ pointerEvents: "none" }}
              alt={`the cat`}
            />
            <div
              className="flex gap-2 m-4 mb-2 items-baseline"
              id="name-container"
            >
              <h1>{cat.name}</h1>
              <h2>{cat.age}</h2>
            </div>
            <div id="info-container" className="flex gap-4 text-[12px] ml-4">
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
