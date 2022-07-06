//여기서 id는 검색된 값 순서대로 id임!!
function appendTempHtml(id, title, img, author, comments, article_id) {
    let temp_html5 = `
                <div id="search-card${id}" class="card" style="width: 18rem; height:20rem;float:left;margin-right:1rem;margin-bottom:20px">
                    <img id="search-img${id}" src="${img}" class="card-img-top"  onclick="searchModalOn(${id})" style="width:100%;height:70%;border-radius:10px">
                    <div class="card-body"  onclick="searchModalOn(${id})">
                        <a ><p id="search-title${id}" class="title">${title} <span style="font-size:0.8rem">by. ${author}</span></p></a>                    
                    </div>
                </div>
                `

    let temp_html6 = `
                <div id="s-modal-bg${id}" class="modal-bg" style="display:none;z-index:1000;">
                    <div class="modal" style="border-radius:5px;">
                        <div class="modal-left" style="overflow:hidden;"><img class="modal-img" id=modal-img src="${img}" style="object-fit:cover;""></div>
                        <div class="modal-right" style="margin-top:10px">
                            <button onclick=searchModalOff() style='background-color:transparent;border:none;'><i class="fa fa-x"></i></button>
                            <span style='margin-left:15px'><h2 id="modal-title" >${title}</h2>
                                ${author}
                                <select name="score" id="s-score${article_id}">
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
                            <ol id="s-comment-list${article_id}" class="comment-list" style='list-style:none;margin-left:15px;padding:0;'>
                                
                            </ol>
                            <div style="margin-bottom:16px">
                                <input class="form-control"  placeholder="댓글 달기..." id="s-modal-comment${article_id}" >
                                <button id="s-comment_button${article_id}" class="comment_button" onclick="handleCommentCreate(${article_id})" style="background-color:#11264f; color:white">게시</button>
                            </div>
                        </div>
                    </div>
                </div>                
                `
    $('#row').append(temp_html5)
    $('#row').append(temp_html6)
    //댓글
    for (let j = 0; j < comments.length; j++) {
        $(`#comment-list${id}`).append(`<li>${comments[j].comment}</li><hr style="margin-right: 15px">`)
    }
}
function searchModalOn(id) {
    document.getElementById('s-modal-bg' + id).style.display = "flex"
};
function searchModalOff(id) {
    window.location.reload()
};

//코멘트 작성
async function handleCommentCreate(id) {
    var comment = document.getElementById("s-modal-comment" + id).value
    let article_id = id
    console.log(comment, article_id)
    await postComment(comment, article_id)
}

function searchModalOn(id) {
    document.getElementById('s-modal-bg' + id).style.display = "flex"
};

function searchModalOff(id) {
    window.location.reload()
};

// 코멘트 작성
async function handleCommentCreate(id) {
    var comment = document.getElementById("s-modal-comment" + id).value
    let article_id = id
    console.log(comment, article_id)
    await postComment(comment, article_id)
}