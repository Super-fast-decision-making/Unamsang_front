
async function postArticle(title,is_active, exposure_end_date){
    const articleData={
        title:title,
        is_active:is_active,
        exposure_end_date:exposure_end_date,
    }
    console.log(articleData)
    console.log("*************")

    const response = await fetch('http://127.0.0.1:8000/article',{
        method:'POST',
        headers:{'Authorization':localStorage.getItem("token")},
        body:JSON.stringify(articleData)
    })
    response_json = await response.json()
    console.log(response_json)
    
    if (response.status==200){
        window.location.replace(`${frontend_base_url}/`);
    }else{
        alert(response.status)
    }

}