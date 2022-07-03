
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




//모달 온오프
function modalOn(id){
    document.getElementById('modal-bg'+id).style.display="flex"
};

function modalOff(id){
    document.getElementById('modal-bg'+id).style.display="none"
};


