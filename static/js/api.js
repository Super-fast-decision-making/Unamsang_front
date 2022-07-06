const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// 회원가입
async function handleSignup() {
    const signupData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    const response = await fetch(`${backend_base_url}/user/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signupData)
    })
    response_json = await response.json()

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/login.html`);
    } else {
        alert(response.status)
    }
}

// 로그인
async function handleLogin() {

    const loginData = {
        username: document.getElementById("username").value,
        password: document.getElementById('password').value
    }
    const response = await fetch(`${backend_base_url}/user/login/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    response_json = await response.json()

    if (response.status == 200) {
        localStorage.setItem("user_access_token", response_json.access)
        localStorage.setItem("user_refresh_token", response_json.refresh)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload)
        window.location.replace(`${frontend_base_url}`)
    } else {
        alert(response.status)
    }
}

// 로그아웃
function userLogout() {
    localStorage.removeItem("user_access_token")
    localStorage.removeItem("user_refresh_token")
    localStorage.removeItem("payload")
    window.location.replace(`http://127.0.0.1:5500`);
}

// 이미지 생성
async function startImageGenerator(prompt) {
    const promptData = {
        prompt: prompt,
    }

    const response = await fetch(`${backend_base_url}/article/text/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(promptData)
    })

    response_json = await response.json()//{'images':이미지주소, 'title':'kitty'}
    console.log(response_json)
    image_name = response_json['images']
    title = response_json['title']
    let path = `${backend_base_url}` + image_name + '_finalgrid.png'
    console.log(path)

    showPromptImage(path)

    if (response.status == 200) {
        alert(response.status);

    } else {
        alert(response.status);
    }
}

// 아티클 생성
async function postArticle(title, img_url, is_active, exposure_end_date) {
    const articleData = {
        title: title,
        image_location: img_url,
        is_active: is_active,
        exposure_end_date: exposure_end_date,
    }

    const response = await fetch(`${backend_base_url}/article/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
        body: JSON.stringify(articleData)
    })
    response_json = await response.json()

    if (response.status == 200) {
        alert(response.status);
        window.location.reload()
    } else {
        alert(response.status);
    }
}

// 아티클 불러오기(메인)
async function getArticles() {
    const response = await fetch(`${backend_base_url}/article/`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            // 'Authorization':"Bearer "+localStorage.getItem("user_access_token")
        },
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    } else {
        alert(response.status);
    }
}

// 코멘트 불러오기(즉시)
function ResponseloadComments(data) {
    comment = data.comment
    comment_id = data.id
    article_id = data.article
    article_len = response_json.length
    target_num = article_len - article_id

    let comment_section = document.getElementById("comment-list" + article_id)

    let newComment_test = document.createElement("li")
    newComment_test.setAttribute("id", `comment-card${comment_id}`)
    newComment_test.setAttribute("class", "comment-card")
    newComment_test.innerHTML +=
        `<p id=${comment_id}>${comment}</p>
        <span>
            <button id="deleteComment${comment_id}" type="button" onclick="deleteComment(${article_id}, ${comment_id})">삭제</button>
            <button id="updateComment${comment_id}" type="button" onclick="updateComment(${article_id}, ${comment_id})">수정</button>
        </span>
        `
    comment_section.appendChild(newComment_test)

    // 입력창 비우기
    document.getElementById("main-modal-comment" + article_id).value = ""
}

// 코멘트 생성(API)
async function postComment(comment, article_id) {
    const commentData = {
        article: article_id,
        comment: comment,
    }

    const response = await fetch('http://127.0.0.1:8000/article/comment/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
        body: JSON.stringify(commentData)
    }).then(response => response.json())
        .then(data => {
            ResponseloadComments(data)

        })
    // if (response.status == 200) {
    //     alert(response.status);
    // } else {
    //     alert(response.status);
    // }
}

// 코멘트 작성
async function handleCommentCreate(id) {
    var comment = document.getElementById("main-modal-comment" + id).value
    let article_id = id
    console.log(comment, article_id)
    await postComment(comment, article_id)
}

// 점수 업로드하기(API)
async function postScore(score, id) {
    const scoreData = {
        article: id,
        rating: score,
    }
    const response = await fetch(`${backend_base_url}/article/rating/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
        body: JSON.stringify(scoreData)
    })
    response_json = await response.json()

    if (response.status == 201) {
        alert("평가 감사합니다.");
    } else {
        alert(response.status);
    }
}

// 점수 업로드하기
function uploadScore(id) {
    console.log(document.getElementById('score' + id).value)
    var score = document.getElementById('score' + id).value
    postScore(score, id)
}

// 평점 불러오기
function loadRatings(response_json) {
    rating_len = response_json[0]['rating'].length
    article_len = response_json.length
    rating0 = response_json[0]['rating']

    for (let i = 0; i < article_len; i++) {
        let rating_avg = response_json[i].rating.rating_.rating__avg
        if (rating_avg != null) {
            document.getElementById("carousel-rating" + i).innerHTML = rating_avg
        }
    }
}

// 유저 이름 가져오기
async function getName() {
    token = localStorage.getItem("user_access_token")

    const response = await fetch(`http://127.0.0.1:8000/user/api/authonly/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
    })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        return null
    }
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

// 댓글 수정(API)
async function putComment(comment, article_id, comment_id) {
    const commentData = {
        article: article_id,
        comment: comment,
    }
    console.log(commentData)
    const response = await fetch(`${backend_base_url}/article/comment/${comment_id}/`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
        body: JSON.stringify(commentData)
    })
    response_json = await response.json()
    if (response.status == 200) {
        return response_json
    } else {
        alert(response.status);
    }
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

// 댓글 삭제
async function deleteComment(article_id, comment_id) {
    const response = await fetch(`${backend_base_url}/article/comment/${comment_id}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        }
    })
    if (response.status == 204) {
        const comment_card = document.getElementById('comment-card' + comment_id)
        comment_card.remove()
        alert("삭제되었습니다.");
    } else {
        alert(response.status);
    }
}

// 검색하기
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

checkLogin()