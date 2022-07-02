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

// 로그아웃
function logout() {
    localStorage.removeItem("user_access_token")
    localStorage.removeItem("user_refresh_token")
    localStorage.removeItem("payload")
    window.location.replace(`http://127.0.0.1:5500/main.html`);
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
    let path = 'http://127.0.0.1:8000/' + image_name +'_finalgrid.png'
    console.log(path)

    showPromptImage(path)

    if (response.status == 200) {
        alert(response.status);//http://127.0.0.1:5500/main.html

    } else {
        alert(response.status);
    }

}
//아티클 생성
async function postArticle(title, img_url, is_active, exposure_end_date){
    const articleData={
        title:title,
        image_location:img_url,
        is_active:is_active,
        exposure_end_date:exposure_end_date,
    }
    console.log(articleData)
    console.log("*************")

    const response = await fetch('http://127.0.0.1:8000/article/',{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization':"Bearer "+localStorage.getItem("user_access_token")
        },
        body:JSON.stringify(articleData)
    })
    response_json = await response.json()
    console.log(response_json)

    if (response.status==200){
        alert(response.status);//http://127.0.0.1:5500/main.html
        window.location.reload()
    }else{
        alert(response.status);
    }

}

//아티클 불러오기
window.onload = async function getArticles(){
    const response = await fetch('http://127.0.0.1:8000/article/',{
        method:'GET',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json',
            // 'Authorization':"Bearer "+localStorage.getItem("user_access_token")
        },
    })
    response_json = await response.json()
    console.log(response_json)
    console.log(response_json.length)//아티클 갯수
    a_length=response_json.length
    loadArticles(response_json,a_length )
}




