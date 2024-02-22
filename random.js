

// promise reject example
// const pro = new Promise((res,rej)=>{
//     const studentArray = {
//         name:"rahul patel",
//         roll:23,
//         ph:12312411,
//         address:"Delhi"
//     }
//     rej(new Error("data not found"))
// })

// pro.catch((error)=>{
//   console.log(error);
// })


// promise resolve example
const pro = new Promise((res,rej)=>{
    const studentArray = {
        name:"rahul patel",
        roll:23,
        ph:12312411,
        address:"Delhi"
    }
    res(studentArray)
})

pro.then((data)=>{
  console.log(data);
})