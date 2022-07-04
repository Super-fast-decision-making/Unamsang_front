


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

// 마이페이지 아티클 불러오기 api.js
window.onload = async function getMypage() {
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
  console.log(response_json.length)//아티클 갯수
  a_length = response_json.length
  // console.log(response_json[0]['image_location'])
  return response_json
}


// Mypage.js
async function loadMypage() {
  console.log("hereaosuid")
}

loadMypage();
// getName();







