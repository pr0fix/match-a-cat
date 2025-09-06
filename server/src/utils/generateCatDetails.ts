const catNames = [
  "Whiskers",
  "Luna",
  "Oliver",
  "Bella",
  "Leo",
  "Nala",
  "Simba",
  "Cleo",
  "Lucy",
  "Milo",
  "Lily",
  "Charlie",
  "Kitty",
  "Shadow",
  "Loki",
  "Felix",
  "Mittens",
  "Oscar",
  "Smokey",
  "Tiger",
  "Misty",
  "Pepper",
  "Ginger",
  "Sasha",
  "Toby",
  "Princess",
  "Salem",
  "Oreo",
  "Pumpkin",
  "Coco",
];

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Miami",
  "Seattle",
  "Portland",
  "Boston",
  "Austin",
  "Denver",
  "Nashville",
  "San Francisco",
  "Philadelphia",
  "Atlanta",
  "Dallas",
  "Phoenix",
];

const generateAge = (): string => {
  const years = Math.floor(Math.random() * 15) + 1;
  return `${years} yr${years !== 1 ? "s" : ""}`;
};

const randomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateCatDetails = () => {
  return {
    name: randomItem(catNames),
    age: generateAge(),
    gender: Math.random() > 0.5 ? "Male" : "Female",
    location: randomItem(locations),
  };
};
