async function fetchDataWithErrorHandling() {

    try {

        const response = await fetch("https://swapi.dev/api/people/1111111");

        if (!response.ok) {

            throw new Error("Network response error");

        }

        const data = await response.json();
        console.log(data);

    } catch (error) {

        console.error("Fetch error:", error);

    }

}