function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}


window.onload = async function getMyArticles() {
  const response = await fetch('http://127.0.0.1:8000/user/mypage/', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("user_access_token")
      },
  })
  response_json = await response.json()
  console.log(response_json)
  console.log(response_json['article'].length)
  console.log(response_json['comment'].length)

  for (var i = 0; i <= response_json['article'].length; i++) {      
      let title = response_json['article'][i]['title']
      let image = response_json['article'][i]['image_location']
      // let article_id = response_json['article'][i]['id']
      // let username = response_json['article'][i]['username']
      appendTempHtml3(title, image)
  
  for (var i=0; i<= response_json['comment'].length; i++) {
    let comment = response_json['comment'][i]['comment']
    let author = response_json['comment'][i]['user']
    let post_id = response_json['comment'][i]['article']

    appendTempHtml4(comment, author, post_id)
  }

  
      
  }
}