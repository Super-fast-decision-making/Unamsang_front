// 모달 
function mainModalOn(id) {
  document.getElementById('modal-bg' + id).style.display = "flex"
};
function mainModalOff(id) {
  window.location.reload()
};

// 코멘트 불러오기
async function loadComments(response_json) {
  const response_user = await getName();
  const user = response_user.username

  comment_len = response_json[0]['comments'].length
  article_len = response_json.length

  for (let i = 0; i < article_len; i++) {
    comment_len = response_json[i]['comments'].length
    article_id = response_json[i]['id']
    for (let j = 0; j < comment_len; j++) {
      let comment_section = document.getElementById("comment-list" + article_id)

      comment_user = response_json[i]['comments'][j]['user']
      newComment = response_json[i]['comments'][j]['comment']
      newComment_id = response_json[i]['comments'][j]['id']

      let newComment_test = document.createElement("li")
      newComment_test.setAttribute("id", `comment-card${newComment_id}`)
      newComment_test.setAttribute("class", "comment-card")

      if (user == comment_user) {
        newComment_test.innerHTML +=
          `<p id=${newComment_id}>${newComment}</p>
                  <span>
                      <button id="deleteComment${newComment_id}" type="button" onclick="deleteComment(${article_id}, ${newComment_id})">삭제</button>
                      <button id="updateComment${newComment_id}" type="button" onclick="updateComment(${article_id}, ${newComment_id})">수정</button>
                  </span>`
      } else {
        newComment_test.innerHTML +=
          `<p>${newComment}</p>`
      }
      comment_section.appendChild(newComment_test)
    }
  }
}

//i는 i번째 항 
function appendTempHtml(i, title, image, article_id, author, comments) {

  // 게시물 카드 생성
  let temp_html = `
          <div class="card-container" style="padding:10px">
              <div class="main_card" style="overflow:hidden; background-color:#1F2124;color:white">
                  <div class="carousel-img" style="font-size:1.5rem;font-weight:bold">${title}</div>
                  <img class="carouselimg" id="carouselimg${i}" src="${image}" style="object-fit:cover;" onclick=mainModalOn(${i})>
              </div>
          </div>
      `
  // 게시물 모달 생성
  let temp_html2 = `
          <div id="modal-bg${i}" class="modal-bg" style="display:none;z-index:1000;">
              <div class="modal" style="border-radius:5px;">
                  <div class="modal-left" style="overflow:hidden;"><img class="modal-img" id=modal-img src="${image}" style="object-fit:cover;""></div>
                  <div class="modal-right" style="margin-top:10px">
                      <button onclick=mainModalOff(${i}) style='background-color:transparent;border:none;'><i class="fa fa-x"></i></button>
                      <span style='margin-left:15px'><h2 id="modal-title" >${title}</h2>
                          ${author}
                          <select name="score" id="score${article_id}">
                              <option disabled selected value>점수</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                          </select>
                          <button type="submit" class="fin-btn" onclick="uploadScore(${article_id})">입력</button>
                          </span>
                      <hr>
                      <ol id="comment-list${article_id}" class="comment-list" style='list-style:none;margin-left:15px;padding:0;'>
                          
                      </ol>
                      <div style="margin-bottom:16px">
                          <input class="form-control"  placeholder="댓글 달기..." id="main-modal-comment${article_id}" >
                          <button id="comment_button${article_id}" class="comment_button${article_id}" onclick="handleCommentCreate(${article_id})" style="background-color:#11264f; color:white">게시</button>
                      </div>
                  </div>
              </div>
          </div>                
      `
  $('#track').append(temp_html)
  $('#idx_head').append(temp_html2)
}

// 아티클 불러오기(메인)
async function showArticles() {
  const response_json = await getArticles();
  a_length = response_json.length

  // 메인페이지 캐로셀 생성
  for (var i = 0; i < response_json.length; i++) {
    let title = response_json[i]['title']
    let image = response_json[i]['image_location']
    let article_id = response_json[i]['id']
    let author = response_json[i]['user']
    let comments = response_json[i]['comments']
    appendTempHtml(i, title, image, article_id, author, comments)
  }
  loadComments(response_json)
}

showArticles()