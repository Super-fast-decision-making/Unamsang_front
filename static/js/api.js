const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// const frontend_base_url = "https://62c2e16d355a9e6915111cdf--lighthearted-khapse-2366de.netlify.app/"


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
        body: JSON.stringify(signupData) // js object를 json형식으로 바꿔주어야함.
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




// 이미지 생성
async function startImageGenerator(prompt) {
    const promptData = {
        prompt: prompt,
    }
    console.log(promptData)

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
    let path = 'http://127.0.0.1:8000/' + image_name + '_finalgrid.png'
    console.log(path)

    showPromptImage(path)

    if (response.status == 200) {
        alert(response.status);

    } else {
        alert(response.status);
    }
}

//아티클 생성
async function postArticle(title, img_url, is_active, exposure_end_date) {
    const articleData = {
        title: title,
        image_location: img_url,
        is_active: is_active,
        exposure_end_date: exposure_end_date,
    }
    console.log(articleData)
    console.log("*************")

    const response = await fetch('http://127.0.0.1:8000/article/', {
        method: 'POST',
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



//아티클 불러오기
window.onload = async function getArticles() {
    const response = await fetch('http://127.0.0.1:8000/article/', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            // 'Authorization':"Bearer "+localStorage.getItem("user_access_token")
        },
    })
    response_json = await response.json()
    console.log(response_json)
    console.log(response_json.length)//아티클 갯수
    a_length = response_json.length
    console.log(response_json[0]['image_location'])

    //메인페이지 캐로셀 생성
    // console.log("여기" + response_json.length)
    for (var i = 0; i < response_json.length; i++) {
        let title = response_json[i]['title']
        let image = response_json[i]['image_location']
        let article_id = response_json[i]['id']
        let author = response_json[i]['user']
        let comments = response_json[i]['comments']
        appendTempHtml(i, title, image, article_id, author, comments)
    }


    // loadArticles(response_json)
    // //로드 아티클
    // for (var i = 0; i <= 2; i++) {
    //     let imgs = response_json[i]['image_location'].split('final')[0]
    //     document.getElementById("carousel-title" + i).innerHTML = 'title: ' + response_json[i]['title']
    //     document.getElementById("carousel-author" + i).innerHTML = 'author: ' + response_json[i]['user']
    //     for (var j = 0; j <= 3; j++) {//이미지뿌려주기
    //         document.getElementById("carouselimg" + i + "_" + (j + 1)).src = imgs + j + '.png'
    //     }
    //     document.getElementById("carouselimg" + i + "_5").src = response_json[i]['image_location']
    //     document.getElementById("carousel-id" + i).innerHTML = response_json[i]['id']
    // }
    // loadRatings(response_json)
    //로드모달
    // loadModals(response_json)
    // for (var i = 0; i < 2; i++) {
    //     document.getElementById('modal-img' + i).src = response_json[i]['image_location']
    //     document.getElementById('modal-title' + i).innerHTML = response_json[i]['title']
    //     document.getElementById("modal-author" + i).innerHTML = 'author: ' + response_json[i]['user']
    // }
    loadComments(response_json)
}

// 코멘트 생성
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
            loadComments2(data)

        })
    // if (response.status == 200) {
    //     alert(response.status);
    // } else {
    //     alert(response.status);
    // }
}

//점수 업로드 하기
async function postScore(score, id) {
    const scoreData = {
        article: id,
        rating: score,
    }
    console.log('score:' + id + score)
    // console.log(typeof (id))
    const response = await fetch('http://127.0.0.1:8000/article/rating/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
        body: JSON.stringify(scoreData)
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

//코멘트 불러오기
async function loadComments(response_json) {
    const response_user = await getName();
    const user = response_user.username

    comment_len = response_json[0]['comments'].length
    article_len = response_json.length

    for (let i = 0; i < article_len; i++) {
        comment_len = response_json[i]['comments'].length
        article_id = response_json[i]['id']
        for (let j = 0; j < comment_len; j++) {
            // let comment_section = document.getElementById("comment-list" + i)
            // let newComment = document.createElement("li")
            // newComment.innerText = response_json[i]['comments'][j]['comment']
            // comment_section.appendChild(newComment)

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

//코멘트 불러오기2
function loadComments2(data) {
    console.log(data)
    comment = data.comment
    comment_id = data.id
    article_id = data.article
    article_len = response_json.length
    console.log(response_json)
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
    console.log(newComment_test)
    comment_section.appendChild(newComment_test)

    // 댓글
    // let newComment = document.createElement("li")
    // newComment.innerText = comment
    // comment_section.appendChild(newComment)

    // 수정 버튼
    // let newComment_update_button = document.createElement("button")
    // newComment_update_button.setAttribute("id", "comment")
    // newComment_update_button.setAttribute("type", "button")
    // newComment_update_button.setAttribute("onclick", "UpdateComment()")
    // newComment_update_button.innerText = "update"
    // comment_section.appendChild(newComment_update_button)

    // 삭제 버튼
    // let newComment_delete_button = document.createElement("button")
    // newComment_delete_button.setAttribute("type", "button")
    // newComment_delete_button.setAttribute("onclick", "UpdateComment()")
    // newComment_delete_button.innerText = "delete"
    // comment_section.appendChild(newComment_delete_button)

    // 입력창 비우기
    document.getElementById("main-modal-comment" + article_id).value = ""
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

//점수 업로드 하기
async function postScore(score, id) {
    console.log(id + score)
    const scoreData = {
        article: id,
        rating: score,
    }
    const response = await fetch('http://127.0.0.1:8000/article/rating/', {
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
        alert("성공!!");
    } else {
        alert(response.status);
    }
}

// 댓글 수정
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