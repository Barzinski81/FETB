async function simplePromiseAsync() {
    
    await new Promise((resolve, reject) => {

        setTimeout(resolve, 2000);

    })

    console.log("Async/Await is awesome!");
}

// Shorter version:

// async function simplePromiseAsync() {

//     await new Promise(resolve => setTimeout(resolve, 2000));

//     console.log("Async/Await is awesome!");
// }