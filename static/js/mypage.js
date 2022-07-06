function editModalOn() {
  document.getElementById('modal-name').style.display = "flex";
  let article_no = document.getElementById("article_id").innerText;
  let article_title = document.getElementById("my-title").innerText;
  document.getElementById('article_no').innerHTML = article_no;
  document.getElementById('article_title').innerHTML = article_title;
}

function editModalOff() {
  document.getElementById('modal-name').style.display = "none"
}

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
// function myComment(comments){
//   for (var i=0; i<= comments.length; i++) {
//     let comment = comments[i]['comment']
//     let author = comments[i]['user']
//     let post_id = comments[i]['article']
//     appendTempHtml4(comment, author, post_id)
//   } 
// }
function myArticle(response_json) {

  let comments = response_json['comment']
  let articles = response_json['article']

  for (var i = 0; i < articles.length; i++) {
    let a_title = articles[i]['title']
    let image = articles[i]['image_location']
    let article_id = articles[i]['id']
    // let username = response_json['article'][i]['username']
    console.log(a_title)
    appendTempHtml3(a_title, image, article_id)
  }
  for (var i = 0; i < comments.length; i++) {
    let comment = comments[i]['comment']
    let author = comments[i]['user']
    let post_id = comments[i]['article']
    appendTempHtml4(comment, author, post_id)
  }
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
  // const comments = response_json['comment']
  // const articles = response_json['article']


  myArticle(response_json)
  // myComment(comments)


}




async function updateArticle(article_no, article_title, is_active, exposure_end_date) {
  const articleData = {
    title: article_title,
    is_active: is_active,
    exposure_end_date, exposure_end_date
  }
  const response = await fetch(`http://127.0.0.1:8000/article/${article_no}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("user_access_token")
    },
    body: JSON.stringify(articleData)
  })
  response_json = await response.json()
  console.log(response_json)

  if (response.status == 200) {
    alert(response.status);
    window.location.reload()
  } else {
    alert(response.status);
  }
}

async function DeleteArticle(article_no, article_title) {
  const articleData = {
    title: article_title,
    article_id: article_no
  }
  console.log(`http://127.0.0.1:8000/article/${article_no}/`)
  const response = await fetch(`http://127.0.0.1:8000/article/${article_no}/`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("user_access_token")
    },
    body: JSON.stringify(articleData)
  })
  response_json = await response.json()
  console.log(response_json)

  if (response.status == 200) {
    alert(response.status);
    window.location.reload()
  } else {
    alert(response.status);
  }
}

function handleArticleUpdate() {
  const article_no = document.getElementById("article_id").innerText;
  const article_title = document.getElementById("my-title").innerText;
  let is_active = document.getElementById("u_is_active").value
  if (is_active == "on") {
    is_active = true
  } else {
    is_active = false
  }
  const exposure_end_date = document.getElementById("u_exposure_end_date").value
  updateArticle(article_no, article_title, is_active, exposure_end_date)
}

function handleArticleDelete() {
  let article_no = document.getElementById("article_id").innerText;
  let article_title = document.getElementById("my-title").innerText;
  DeleteArticle(article_no, article_title)

}

function appendTempHtml3(title, image, article_id) {
  //my_article붙이는 부분
  let temp_html3 = `
      <div id="mypage-card" class="card" style="width: 18rem; height:20rem;float:left;margin-right:1rem;margin-bottom:20px">
          <img id="my-img" src="${image}" class="card-img-top"  onclick="modalOn()" style="width:100%;height:70%;border-radius:10px">
          <div class="card-body"  onclick="modalOn()">
              <a ><p id="my-title" class="title">${title}</p><p style="font-size:0.7rem">article id:<span id="article_id">${article_id}</span></p></a>
              
          </div>
          <div class="btn-con">
              <button class="btn" onclick="editModalOn()">edit/delete</button>
          </div>    
      </div>      
  `
  $('#the_articles').append(temp_html3)
}

//my_comment 붙이는 부분
function appendTempHtml4(comment, author, post_id) {

  let temp_html4 = `
  <div >
      <p style="background-color:white; display:">${comment} <span style="font-size:0.5rem">by.${author} post id:${post_id}</span></p>
  <div>
  <hr style="color:whitesmoke">`;


  $('#the_comments').append(temp_html4)
}

