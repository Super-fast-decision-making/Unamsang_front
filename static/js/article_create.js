function handelArticleCreate(){
    const title = document.getElementById("title").value
    const is_active = document.getElementById("is_active").value
    const exposure_end_date = document.getElementById("exposure_end_date").value
    // console.log(title)
    // console.log(is_active)
    // console.log(exposure_end_date)

    postArticle(title,is_active, exposure_end_date)
}