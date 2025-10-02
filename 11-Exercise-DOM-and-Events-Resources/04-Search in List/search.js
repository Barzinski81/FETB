function search() {
   
   let listOfTowns = document.querySelectorAll("li");
   let input = document.getElementById("searchText").value;
   let result = document.getElementById("result");

   let matches = 0;

   if (input == ''){

      return;

   }

   for (let li of listOfTowns) {

      if ((li.textContent).toLowerCase().includes(input.toLowerCase())) {

         li.style.fontWeight = "bold";
         li.style.textDecoration = "underline";
         matches ++;

      } else {
      
         li.style.fontWeight = '';
         li.style.textDecoration = '';

      }
      
   }

   result.textContent = `${matches} matches found`
}
