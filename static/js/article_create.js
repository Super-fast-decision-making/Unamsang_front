function handelArticleCreate(){

    const title = document.getElementById("title").value
    let is_active = document.getElementById("is_active").value
    if(is_active=="on"){
        is_active=true
    }else{
        is_active=false
    }
    const exposure_end_date = document.getElementById("exposure_end_date").value
    postArticle(title,is_active, exposure_end_date)
}

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