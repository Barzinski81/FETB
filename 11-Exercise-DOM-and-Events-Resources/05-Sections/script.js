function create(words) {

   let content = document.getElementById("content");

   for (let word of words) {

      let div = document.createElement("div");
      let paragraph = document.createElement("p");
      paragraph.textContent = word;
      paragraph.style.display = 'none';

      div.appendChild(paragraph);
      div.addEventListener('click', reveal);

      content.appendChild(div);

      function reveal() {

         paragraph.style.display = '';

      }

   }

}