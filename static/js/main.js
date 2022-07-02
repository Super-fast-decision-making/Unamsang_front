
async function search() {
    const words_for_search = document.getElementById("words_for_search").value;

    var url = new URL(backend_base_url+`/article/search/?words=${words_for_search}`);
    console.log(words_for_search)
    const search_results = await fetch(url)
      .then(response => {
        var status_code = response.status;
        return Promise.resolve(response.json())
               .then(data => ({ data, status_code }))
    })
        
    localStorage.setItem('search_results', JSON.stringify(search_results.data));  

    if (search_results.status_code == 200) {
      window.location.replace(`${frontend_base_url}/search_result.html`);
    } else {
      alert(search_results.data.message)
  }
}

//캐로셀 움직이는 식


// let carouselWidth = document.getElementById('carousel-container0').offsetWidth;
// console.log('width:'+ carouselWidth)
// document.getElementById('next0').addEventListener('click', () => {
//     document.getElementById('track0').style.transform = `translateX(-${carouselWidth0}px)`;
// })
// document.getElementById('prev0').addEventListener('click', () => {
//     document.getElementById('track0').style.transform = `translateX(-${0}px)`;
// })

// window.addEventListener("load", function(){
//     document.getElementById("modal-btn"+0).onclick=function(){
//         document.getElementById('modal-bg'+0).style.display="flex"
//     }

// })





//모달 온오프
function modalOn(id){
    document.getElementById('modal-bg'+id).style.display="flex"
};


function modalOff(id){
    document.getElementById('modal-bg'+id).style.display="none"
};
