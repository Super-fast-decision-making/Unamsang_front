function handlePromptCreate(){
    const prompt = document.getElementById("prompt").value
    console.log(prompt)
    startImageGenerator(prompt)

    const hidden_page = document.querySelector(".input_inner_box")
    hidden_page.classList.remove('hidden_box')
    hidden_page.classList.add('hidden_box')
    const hid_box = document.querySelector(".hid_box")
    hid_box.style.display="flex";


}
function showPromptImage(image_name){
    console.log(image_name,10)
    // image_name=image_name.items
    document.getElementById("main_img").src=image_name

}



// function handleArticleCreate(){

//     const title = document.getElementById("title").value
//     let is_active = document.getElementById("is_active").value
//     if(is_active=="on"){
//         is_active=true
//     }else{
//         is_active=false
//     }
//     const exposure_end_date = document.getElementById("exposure_end_date").value
//     postArticle(title,is_active, exposure_end_date)
// }

async function loadArticles(){
    console.log("here")
    articles= await getArticles()

    const article_list= document.getElementById("articles")
    articles.forEach(element => {
        const newArticle = document.createElement("li")
        newArticle.setAttribute("id", article.id)
        newArticle.innerText = article.titlearticle_list.append(newArticle)
        
    });
}