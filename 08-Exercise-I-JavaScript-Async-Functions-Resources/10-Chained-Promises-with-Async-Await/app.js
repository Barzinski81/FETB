async function chainedPromisesAsync() {
    let p1 = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("First")
        }, 1000);
    })

    let p2 = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Second")
        }, 2000);
    })

    let p3 = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Third")
        }, 3000);
    })
    
    console.log(p1,p2,p3);
}