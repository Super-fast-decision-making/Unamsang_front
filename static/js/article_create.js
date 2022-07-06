// 프리뷰 이미지 만들기+프리뷰 이미지 div 보이기
function handlePromptCreate() {
    const prompt = document.getElementById("prompt").value
    startImageGenerator(prompt)
    document.querySelector(".main_title").style.display = "none"
    document.querySelector(".input_inner_box").style.display = "none"

    const hidden_page = document.querySelector(".input_inner_box")
    hidden_page.classList.remove('hidden_box')
    hidden_page.classList.add('hidden_box')
    const hid_box = document.querySelector(".hid_box")
    hid_box.style.display = "flex";
   
}

// 프리뷰 이미지 구현
function showPromptImage(path) {
    document.getElementById("title").innerHTML = title;
    document.getElementById("main_img").src = path;
    const hid_text_box = document.querySelector(".hid_text_box")
    hid_text_box.style.display = "flex";
}

// 아티클 생성
function handleArticleCreate() {

    const title = document.getElementById("title").innerText;
    const img_url = document.getElementById("main_img").src;
    let is_active = document.getElementById("is_active").value
    if (is_active == "on") {
        is_active = true
    } else {
        is_active = false
    }
    const exposure_end_date = document.getElementById("exposure_end_date").value
    postArticle(title, img_url, is_active, exposure_end_date)
}