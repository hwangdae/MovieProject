document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#search");
  const btn = document.querySelectorAll(".search-btn");
  const ul = document.querySelectorAll(".card-list");


  for (item of btn) {
    item.addEventListener("click", filter);
  }


  function filter(){
    var searchValue, cardTitle, cardInner;
  
    searchValue = input.value.toUpperCase();
    cardInner = document.getElementsByClassName("card");
  
    for(i=0; i<cardInner.length; i++){
      cardTitle = cardInner[i].getElementsByClassName("card-title");
      if(cardTitle[0].innerHTML.toUpperCase().indexOf(searchValue) > -1){
        cardInner[i].style.display = "block";
      }else{
        cardInner[i].style.display = "none";
      }
    }
  }


  input.addEventListener('keydown',function(e) {
    if (e.keyCode === 13) {
      filter()
    }
  })

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWQ4NWY2ZTMyNThlZmY1NzE3ZDBjN2IyNmMyZmEzOSIsInN1YiI6IjY0NzA4N2RmYzVhZGE1MDExODY1YzRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A8BvS_Qd7lfrD2QY-QOyrAWjt_b57m5LuCQKR8Rs6ms",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    // .then(data => console.log(data))
    .then((data) => {
      let rows = data["results"];
      console.log(rows)

      rows.map(function (row){
        let li = document.createElement('li')
        li.classList.add('card')

        let image = document.createElement('img')
        image.src = `https://image.tmdb.org/t/p/w500${row.poster_path}`
        image.classList.add('card-img')

        let title = document.createElement('h3')
        title.innerHTML = row.title;
        title.classList.add('card-title')

        let overview = document.createElement('p')
        overview.innerHTML = row.overview;
        overview.classList.add('card-overview')

        let average = document.createElement('p')
        average.innerHTML = `평점 : ${row.vote_average} 점`;
        average.classList.add('card-average')

        for(item of ul){
          item.appendChild(li).append(image,title,overview,average);
        }

      });
    })
    .catch((err) => console.error(err));
});
