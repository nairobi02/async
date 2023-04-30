const fs = require("fs");
const read = (resource) => {
  return new Promise((resolve, reject) => {
    fs.readFile(resource, "utf8", (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};

const write = (content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./txtFiles/third.txt", content, (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};

const main = async () => {
  const result = {
    first: "",
    second: "",
    third: "",
  };

  result.first = await read("./txtFiles/first.txt");
  result.second = await read("./txtFiles/second.txt");
  result.third = await write(result.first + result.second);
};
main()
  .then(() => {
    return read("./txtFiles/third.txt");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
