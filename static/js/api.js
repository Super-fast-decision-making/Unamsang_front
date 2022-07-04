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
        window.location.replace(`${frontend_base_url}/main.html`)
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
    
    console.log("여기"+response_json.length)
    for (var i=0;i<=response_json.length;i++){
        let title=response_json[i]['title']
        let image=response_json[i]['image_location']
        let article_id =response_json[i]['id']
        appendTempHtml(i, title, image, article_id)
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
    loadRatings(response_json)
    //로드모달
    // loadModals(response_json)
    for (var i = 0; i <= 2; i++) {
        document.getElementById('modal-img' + i).src = response_json[i]['image_location']
        document.getElementById('modal-title' + i).innerHTML = response_json[i]['title']
        document.getElementById("modal-author" + i).innerHTML = 'author: ' + response_json[i]['user']
    }
    loadComments(response_json)
    loadMainPage(response_json)
}
    


//코멘트 생성
async function postComment(comment, article_id) {
    console.log("여기까지 옴2")
    const commentData = {
        article: article_id,
        comment: comment,
    }
    
    console.log(commentData)
    const response = await fetch('http://127.0.0.1:8000/article/comment/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("user_access_token")
        },
        body: JSON.stringify(commentData)
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
function loadComments(response_json) {
    comment_len = response_json[0]['comments'].length
    article_len = response_json.length
    comment0 = response_json[0]['comments']

    for (let i = 0; i < article_len; i++) {
        comment_len = response_json[i]['comments'].length
        for (let j = 0; j < comment_len; j++) {
            let comment_section = document.getElementById("comment-list" + i)
            let newComment = document.createElement("li")
            newComment.innerText = response_json[i]['comments'][j]['comment']
            console.log(response_json[i]['comments'][j]['comment'])
            comment_section.appendChild(newComment)
        }
    }
}

//  불러오기
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



