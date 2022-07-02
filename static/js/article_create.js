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
function showPromptImage(path){
    console.log(title)
    console.log(path,10)
    // image_name=image_name.items
    document.getElementById("title").innerHTML = title;
    document.getElementById("main_img").src=path;
}



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
    // postArticle(title,is_active, exposure_end_date)
    postArticle(title, img_url, is_active, exposure_end_date)
}

async function loadArticles(response_json, a_length){
    console.log("title:"+response_json[1]['title'])
    console.log("img_url:"+response_json[1]['image_location'])//.substring(0,-13)
    const imgs=response_json[1]['image_location'].split('final')[0]
    console.log(typeof imgs)
    console.log(imgs)

    // console.log(imgs.substring(str.length()-13,str.length()))
    const carousel_title = document.getElementById("carousel-title")
    carousel_title.innerHTML = 'title: '+response_json[1]['title']
    console.log(imgs+'0.png')
    document.getElementById("carouselimg1").src = imgs+'0.png'
    document.getElementById("carouselimg2").src = imgs+'1.png'
    document.getElementById("carouselimg3").src = imgs+'2.png'
    document.getElementById("carouselimg4").src = imgs+'3.png'
    document.getElementById("carouselimg5").src= response_json[1]['image_location']

    //[imgs+'0.png'], [imgs+'1.png'], [imgs+'2.png'],[imgs+'3.png'],[response_json[0]['image_location']]


    for(i;i<10;i++){


}



    


//캐로셀 컨테이너 전체를 반복해서 그리고 싶음


    


    // const article_list= document.getElementById("articles")
    // articles.forEach(element => {
    //     const newArticle = document.createElement("li")
    //     newArticle.setAttribute("id", article.id)
    //     newArticle.innerText = article.titlearticle_list.append(newArticle)
        
    // });
}