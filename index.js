//NET NINJA YT async js course
//? Async Await

//an async function always returns a promise, we add the async code inside the function
//fetch is async code, it returns a promise, await keyword before the fetch stalls js there until the promise is resolved.
// only then it assigns the value to reponse, now this is all inside an async function and async itself is non blocking. so the other code in the program will not be blocked.
//the response object has a json method that is async in itself, it returns a promise, so we use await on it again
// then we return data

// const getTodos = async () => {
//   const response = await fetch("./json/luigi.json");
//   const data = await response.json();
//   return data;
// };

//async function still returns a promise so we need to do .then on the promise that it has returned.
//if for example the json is not valid json, the promise returned by    will be rejected. so
// getTodos()
//   .then((data) => {
//     console.log("Resolved:",data);
//   })
//   .catch((err) => console.log("Rejected:", err.message));

//now an issue arises
// if there is an error in the json file, for example invalid syntax, then the promise returned by fetch will be rejected and  the error message will say the error is in syntax of json file.
//however, if there the error is in the url,ans no err in json file then fetch will be resolved without throwing error, but the .json() on the second promise returned, will be invalid and will throw and error
//but the error will be that of invalid syntax in the json, even though that's not true.
//to tackle this
//when we throw error in async function then the promise returned by the async function is rejected.

// const getTodos = async () => {
//   const response = await fetch("./json/luigi.json");
//   if (response.status != 200) {
//     throw new Error("cannot fetch the data");
//   }
//   const data = await response.json();
//   return data;
// };

// getTodos()
//   .then((data) => console.log("resolved", data))
//   .catch((err) => console.log("err", err.message));

//? Fetch API
//fetch API returns a promise, the promise is only rejected if there is a network error.
// It's important to note that the fetch() method only rejects the Promise if there is a network error. Therefore, the code doesn't catch any errors that might occur while parsing the response data.
//so err will only be considered if the api is down or something like that.
// when we log response(data) we notice that there isn't the json anywhere.
//the json is instead in the __proto__ property of the response returned.
//the "json" in the proto property is a method.
//reponse.json returns another promise.
// fetch("./json/mario.json").then(
//   (response) => {
//     console.log(response);
//   },
//   (err) => {
//     console.log(err);
//   }
// );
//so now its the entire thnig, ie below that's returning a promise, so we can do .then on the entire thing to do something after that promise is resolved
// fetch("./json/mario.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log("fetch API promise resolved:", data);
//   })
//   .catch(err);

//? Promise chaining
// First, the getTodos function is defined to take one argument, resource, which is a string that specifies the URL of the resource to be fetched. This function returns a new Promise that encapsulates the asynchronous request.
// The Promise constructor is used to create a new Promise object that takes two arguments: resolve and reject. resolve is a function that will be called if the request is successful, passing in the response data as its argument. reject is a function that will be called if the request is unsuccessful, passing in an error message as its argument.
// Inside the Promise object, a new XMLHttpRequest object is created to make an HTTP request to the specified resource URL. An event listener is added to the XMLHttpRequest object to listen for the readystatechange event, which is fired whenever the readyState property of the object changes, indicating that the request status has been updated.
// When the readystatechange event is fired, the function checks the readyState and status properties of the XMLHttpRequest object to determine if the request is complete and successful. If the request is complete and successful (i.e., readyState is 4 and status is 200), the resolve function is called with the parsed response data as its argument.
// If the request is not successful (i.e., readyState is 4 but status is not 200), the reject function is called with an error message as its argument.
// After defining the getTodos function, it is called three times in succession using Promise chaining.
// When the first getTodos function is called, it returns a Promise object. The then method is called on this Promise object, passing in a callback function that logs the data returned by the first request to the console and then returns the result of calling the second getTodos function.
// The second getTodos function returns a Promise object, and the then method is called on this Promise object as well, passing in a callback function that logs the data returned by the second request to the console and then returns the result of calling the third getTodos function.
// The third getTodos function also returns a Promise object, and the then method is called on this Promise object, passing in a callback function that logs the data returned by the third request to the console.
// By chaining these Promises together using the then method, the code ensures that each request is made only after the previous one has completed successfully. This is necessary because each request depends on the data returned by the previous one.
// If any of the Promises in the chain are rejected (i.e., if an error occurs), the catch method is called, passing in a callback function that logs the error message to the console. This allows the code to gracefully handle errors that may occur during the asynchronous requests.

// const getTodos = (resource) => {
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     request.addEventListener("readystatechange", () => {
//       if (request.readyState === 4 && request.status === 200) {
//         const data = JSON.parse(request.responseText);
//         resolve(data);
//       } else if (request.readyState === 4) {
//         reject("data nto found");
//       }
//     });
//     request.open("GET", resource);
//     request.send();
//   });
// };

//note how getTodos returns a promise, so the entire function will returning a promise, and we will be doing .then on that returned value
// we will return a new promise for the new , chained resource
// getTodos("./json/luigi.json")
//   .then((data) => {
//     console.log("promise 1 resolved:", data);
//     return getTodos("./json/mario.json");
//   })
//   .then((data) => {
//     console.log("promise 2 resolved:", data);
//     return getTodos("./json/shaun.json");
//   })
//   .then((data) => {
//     console.log("promise 3 resolved:", data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//? Callback functions
// const getTodos = (resource, callback) => {
//   const request = new XMLHttpRequest();
//   request.addEventListener("readystatechange", () => {
//     if (request.readyState === 4 && request.status === 200) {
//       const data = JSON.stringify(request.responseText);
//       callback(undefined, data);
//     } else if (request.readyState === 4) {
//       callback("Couldnt find data", undefined);
//     }
//   });
//   request.open("GET", resource);
//   request.send();
// };
// getTodos("./json/luigi.json", (err, data) => {
//   console.log(data);
//   getTodos("./json/shaun.json", (err, data) => {
//     console.log(JSON.parse(data));
//     getTodos("./json/mario.json", (err, data) => {
//       console.log(JSON.parse(data));
//     });
//   });
// });

// The getTodos function is defined to take two arguments: resource and callback. resource is a string that specifies the URL of the resource to be fetched, and callback is a function that will be called when the request is complete.
// The function creates a new XMLHttpRequest object by calling new XMLHttpRequest(). This object is used to make an HTTP request to the specified resource URL.
// An event listener is added to the XMLHttpRequest object to listen for the readystatechange event. This event is fired whenever the readyState property of the object changes, indicating that the request status has been updated.
// When the readystatechange event is fired, the function checks the readyState and status properties of the XMLHttpRequest object to determine if the request is complete and successful. If the request is complete and successful (i.e., readyState is 4 and status is 200), the function calls the callback function with undefined as the first argument (to indicate that no error occurred) and the response data as the second argument.
// If the request is not successful (i.e., readyState is 4 but status is not 200), the function calls the callback function with an error message as the first argument and undefined as the second argument.
// The getTodos function is called three times in succession, each time with a different resource URL and a different callback function.
// When the first getTodos function is called, it makes a request to the luigi.json file and passes a callback function as the second argument. This callback function logs the data returned by the first request to the console and then calls the second getTodos function.
// The second getTodos function makes a request to the shaun.json file and passes a callback function as the second argument. This callback function logs the data returned by the second request to the console and then calls the third getTodos function.
// The third getTodos function makes a request to the mario.json file and passes a callback function as the second argument. This callback function logs the data returned by the third request to the console.
// By nesting these callbacks, the code ensures that each request is made only after the previous one has completed successfully. This is necessary because each request depends on the data returned by the previous one.
// Overall, this code shows how to use callback functions to handle asynchronous requests in JavaScript. By defining a callback function to be executed when the request is complete, the code can continue running while the request is being processed, and then handle the response data once it is available.
