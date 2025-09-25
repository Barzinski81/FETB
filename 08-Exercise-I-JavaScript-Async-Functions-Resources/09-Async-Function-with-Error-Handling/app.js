async function promiseRejectionAsync() {
   try {

      await new Promise((resolve, reject)=> {
      
         setTimeout(() => {

            reject(new Error ("ERROR!!!"));

         })

      })
      
   } catch (error) {

      console.error(error);
      
   }
}