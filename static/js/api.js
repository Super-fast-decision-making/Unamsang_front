async function startImageGenerator(prompt){
    const promptData={
        prompt:prompt,
    }
    console.log(promptData)

    const response = await fetch('http://127.0.0.1:8000/article/text/',{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify(promptData)
    })
    image_name = await response.json()
    console.log(image_name)
    image_name=image_name['images']
    showPromptImage(image_name)
    
    if (response.status==200){
        alert(response.status);//http://127.0.0.1:5500/main.html
    }else{
        alert(response.status);
    }

}





// async function postArticle(title, is_active, exposure_end_date){
//     const articleData={
//         title:title,
//         is_active:is_active,
//         exposure_end_date:exposure_end_date,
//     }
//     console.log(articleData)
//     console.log("*************")

//     const response = await fetch('http://127.0.0.1:00/article',{
//         method:'POST',
//         headers:{
//             Accept: 'application/json',
//             'Content-type': 'application/json'
//         },
//         body:JSON.stringify(articleData)
//     })
//     response_json = await response.json()
//     console.log(response_json)
    
//     if (response.status==200){
//         alert(response.status);//http://127.0.0.1:5500/main.html
//     }else{
//         alert(response.status);
//     }

// }

// async function getArticles(){
//     const response = await fetch('http://127.0.0.1:8000/article',{
//         method:'GET',
//     })
//     response_json = await response.json()
//     console.log(response._json)
//     return response_json.articles
// }
