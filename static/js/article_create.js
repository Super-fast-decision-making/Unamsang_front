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
    console.log("title:"+response_json[0]['title'])
    console.log("img_url:"+response_json[0]['image_location'])
    for (var i=0;i<=2;i++){
        let imgs =response_json[i]['image_location'].split('final')[0]
        document.getElementById("carousel-title"+i).innerHTML = 'title: '+response_json[i]['title']
        for (var j=0;j<=3;j++){
            document.getElementById("carouselimg"+i+"_"+(j+1)).src = imgs+j+'.png'
        }
        document.getElementById("carouselimg"+i+"_5").src= response_json[a_length-(i+1)]['image_location']
        
    }
}   
