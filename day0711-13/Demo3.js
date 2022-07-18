
//         async function fn(){
//             return new Promise((resolve,reject)=>{
//                 resolve("成功")
//             })
//         }
//         let result = fn();
//         result.then(value=>{
// console.log(resolve);
//         },reject=>{
//             console.log(reject);
//         })

//   const p = new Promise((resolve, reject) => {
//      resolve("成功了");
//     // reject("失败了")
//   });
//   async function fn() {
//     try {
//       let result = await p;
//       console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   fn();

const fs = require("fs");
let p = new Promise((resolve, reject) => {
  fs.readFile("./test.txt", (err, data) => {
    if (err) reject;
    resolve(data);
  });
});
p.then(
  (value) => {
    console.log(value);
  },
  (reject) => {
    console.log(reject);
  }
);

