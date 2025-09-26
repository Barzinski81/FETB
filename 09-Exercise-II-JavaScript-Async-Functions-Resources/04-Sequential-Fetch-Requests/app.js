async function fetchSequential() {

      const data1 = await fetch("https://swapi.dev/api/people/1").then(res => res.json());
      const data2 = await fetch("https://swapi.dev/api/people/2").then(res => res.json());

      console.log(data1);
      console.log(data2);
       
}