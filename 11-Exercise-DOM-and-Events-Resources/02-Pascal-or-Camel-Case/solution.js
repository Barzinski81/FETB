function solve() {

  let input = document.getElementById("text").value.toLowerCase();
  let namingConvetion = document.getElementById("naming-convention").value;
  let result = document.getElementById("result");

  let split = input.split(' ');
  let string = '';

  if (namingConvetion === "Camel Case") {
    string += split[0];

    for (let i=1; i < split.length; i++) {

      string += split[i][0].toUpperCase() + split[i].slice(1);
   
    }

    result.textContent = string;

  } else if (namingConvetion === "Pascal Case") {

    for (let i=0; i < split.length; i++) {

      string += split[i][0].toUpperCase() + split[i].slice(1);
      
    }

    result.textContent = string;

  } else {

    result.textContent = "Error!"

  }

}