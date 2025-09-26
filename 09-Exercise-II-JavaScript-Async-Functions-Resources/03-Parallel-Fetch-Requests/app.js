async function fetchParallel() {

  const response = await Promise.all([
      fetch("https://swapi.dev/api/people/1").then(res => res.json()),
      fetch("https://swapi.dev/api/people/2").then(res => res.json())
    ]);

    console.log(response);

}