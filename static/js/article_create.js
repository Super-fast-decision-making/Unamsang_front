//프리뷰 이미지 만들기+프리뷰 이미지 div 보이기

function handlePromptCreate() {
    const prompt = document.getElementById("prompt").value
    // console.log(prompt)
    startImageGenerator(prompt)
    document.querySelector(".main_title").style.display = "none"
    document.querySelector(".input_inner_box").style.display = "none"

    const hidden_page = document.querySelector(".input_inner_box")
    hidden_page.classList.remove('hidden_box')
    hidden_page.classList.add('hidden_box')
    const hid_box = document.querySelector(".hid_box")
    hid_box.style.display = "flex";
   
}

//프리뷰 이미지 구현
function showPromptImage(path) {
    // console.log(title)
    // console.log(path, 10)
    document.getElementById("title").innerHTML = title;
    document.getElementById("main_img").src = path;
    const hid_text_box = document.querySelector(".hid_text_box")
    hid_text_box.style.display = "flex";
}


/////여기까지 프리뷰 이미지가 생성되는 시점


//아티클 생성
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

// //댓글 생성
// async function handleCommentCreate(id) {
//     var comment = document.getElementById("search-modal-comment" + id).value
//     let article_id = id
//     console.log(comment, article_id)
//     await postComment(comment, article_id)
// }


//아티클 불러오기
// async function loadArticles(response_json){
//     console.log("title:"+response_json[0]['title'])
//     console.log("img_url:"+response_json[0]['image_location'])
//     for (var i=0;i<=2;i++){
//         let imgs =response_json[i]['image_location'].split('final')[0]
//         document.getElementById("carousel-title"+i).innerHTML = 'title: '+response_json[i]['title']
//         document.getElementById("carousel-author"+i).innerHTML = 'author: '+response_json[i]['user']
//         for (var j=0;j<=3;j++){
//             document.getElementById("carouselimg"+i+"_"+(j+1)).src = imgs+j+'.png'
//         }
//         document.getElementById("carouselimg"+i+"_5").src = response_json[i]['image_location']
//         // document.getElementById("carousel-id"+i).innerHTML = "id: "+response_json[i]['id']
//     }
// }


//모달 내용 불러오기
async function loadModals(response_json) {
    for (var i = 0; i <= 2; i++) {
        document.getElementById('modal-img' + i).src = response_json[i]['image_location']
        document.getElementById('modal-title' + i).innerHTML = response_json[i]['title']
        document.getElementById("modal-author" + i).innerHTML = 'author: ' + response_json[i]['user']
    }
}


