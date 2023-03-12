const fs = require('fs')
const result = {
  first: "",
  second: "",
  final: ""
}
const read = (resource) => {
  return new Promise((resolve, reject) => {
    fs.readFile(resource, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  });
}
const write = (resource) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(resource, result.first + result.second, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}
read('./txtFiles/first.txt').then((data) => {
  result.first = data;
  return read('./txtFiles/second.txt')
}).then((data) => {
  result.second = data;
  return write('./txtFiles/third.txt')
}).then((data) => {
  result.final = data;
  return read('./txtFiles/third.txt')
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})
