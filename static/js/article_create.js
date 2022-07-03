//프리뷰 이미지 만들기+프리뷰 이미지 div 보이기
function handlePromptCreate(){
    const prompt = document.getElementById("prompt").value
    console.log(prompt)
    startImageGenerator(prompt)

    const hidden_page = document.querySelector(".input_inner_box")
    hidden_page.classList.remove('hidden_box')
    hidden_page.classList.add('hidden_box')
    const hid_box = document.querySelector(".hid_box")
    hid_box.style.display="flex";
    const hid_text_box = document.querySelector(".hid_text_box")
    hid_text_box.style.display="flex";


}

//프리뷰 이미지 구현
function showPromptImage(path){
    console.log(title)
    console.log(path,10)
    document.getElementById("title").innerHTML = title;
    document.getElementById("main_img").src=path;
}


//아티클 생성
function handleArticleCreate(){

    const title = document.getElementById("title").innerText;
    const img_url = document.getElementById("main_img").src;
    let is_active = document.getElementById("is_active").value
    if(is_active=="on"){
        is_active=true
    }else{
        is_active=false
    }
    const exposure_end_date = document.getElementById("exposure_end_date").value
    postArticle(title, img_url, is_active, exposure_end_date)
}
//댓글 생성
function handleCommentCreate(id){
    const comment = document.getElementById("idx-comment"+id).value;
    const article_id = document.getElementById("carousel-id"+id).innerText;
    postComment(comment, article_id)
    
}


//아티클 불러오기
async function loadArticles(response_json){
    console.log("title:"+response_json[0]['title'])
    console.log("img_url:"+response_json[0]['image_location'])
    for (var i=0;i<=2;i++){
        let imgs =response_json[i]['image_location'].split('final')[0]
        document.getElementById("carousel-title"+i).innerHTML = 'title: '+response_json[i]['title']
        document.getElementById("carousel-author"+i).innerHTML = 'author: '+response_json[i]['user']
        for (var j=0;j<=3;j++){
            document.getElementById("carouselimg"+i+"_"+(j+1)).src = imgs+j+'.png'
        }
        document.getElementById("carouselimg"+i+"_5").src = response_json[i]['image_location']
        // document.getElementById("carousel-id"+i).innerHTML = "id: "+response_json[i]['id']
    }
}

//모달 내용 불러오기
async function loadModals(response_json){
    for (var i=0;i<=2;i++){
        document.getElementById('modal-img'+i).src = response_json[i]['image_location']
        document.getElementById('modal-title'+i).innerHTML = response_json[i]['title']
        document.getElementById("modal-author"+i).innerHTML = 'author: '+response_json[i]['user']
    }
    for (var i=0; i<=2;i++){
        // let comments =response_json[i]['comments']
        // let comment_list =document.getElementById("comment-list"+i)
        // comments.forEach(comment=>{
        //     let newComment = document.createElement("li")
        //     newComment.innerText = comment['comment']
        //     comment_list.appendChild(newComment)
        // })
        
    }
}




