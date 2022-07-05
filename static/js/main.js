async function search() {
  const words_for_search = document.getElementById("words_for_search").value;

  var url = new URL(backend_base_url + `/article/search/?words=${words_for_search}`);
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
function modalOn(id) {
  document.getElementById('modal-bg' + id).style.display = "flex"
};

function modalOff(id) {
  document.getElementById('modal-bg' + id).style.display = "none"
};


// 로그아웃
function userLogout() {
  localStorage.removeItem("user_access_token")
  localStorage.removeItem("user_refresh_token")
  localStorage.removeItem("payload")
  window.location.replace(`http://127.0.0.1:5500`);
}


// 로그인 여부 확인
async function checkLogin() {
  const response_json = await getName();
  console.log(response_json)
  const user = response_json.username
  const login_link = document.getElementById('login_link')


  if (user) {
    logout_button.style.display = 'block'
    login_link.innerText = user
    login_link.setAttribute("href", "/mypage.html")
  }
}

// 댓글 수정 활성화
function updateComment(article_id, comment_id) {
  const comment_button = document.getElementById('comment_button' + article_id)

  // 버튼 바꾸기
  comment_button.setAttribute("onclick", `handleCommentUpdate(${article_id}, ${comment_id})`)
  comment_button.innerText = "수정"

  // 입력창 채우기
  const target_comment = document.getElementById(comment_id).innerText
  document.getElementById("main-modal-comment" + article_id).value = target_comment
}

// 댓글 수정
async function handleCommentUpdate(article_id, comment_id) {

  const comment = document.getElementById("main-modal-comment" + article_id).value
  const response_json = await putComment(comment, article_id, comment_id);
  let newComment = response_json.comment
  console.log(response_json)

  const target_comment = document.getElementById(comment_id)
  target_comment.innerText = newComment

  // 버튼 돌려놓기
  const comment_button = document.getElementById('comment_button' + article_id)
  comment_button.innerText = "게시"

  // 입력창 비우기
  document.getElementById("main-modal-comment" + article_id).value = ""
}

checkLogin()