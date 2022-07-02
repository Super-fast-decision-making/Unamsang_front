//캐로셀 움직이는 식


let carouselWidth = document.getElementById('carousel-container0').offsetWidth;
console.log('width:'+ carouselWidth)
document.getElementById('next0').addEventListener('click', () => {
    document.getElementById('track0').style.transform = `translateX(-${carouselWidth0}px)`;
})
document.getElementById('prev0').addEventListener('click', () => {
    document.getElementById('track0').style.transform = `translateX(-${0}px)`;
})

// window.addEventListener("load", function(){
//     document.getElementById("modal-btn"+0).onclick=function(){
//         document.getElementById('modal-bg'+0).style.display="flex"
//     }

// })

// $('#')
    

//모달 온오프
function modalOn0(){
    document.getElementById('modal-bg'+0).style.display="flex"
};
function modalOn1(){
    document.getElementById('modal-bg'+1).style.display="flex"
};
function modalOn2(){
    document.getElementById('modal-bg'+2).style.display="flex"
};

function modalOff0(){
    document.getElementById('modal-bg'+0).style.display="none"
};
function modalOff1(){
    document.getElementById('modal-bg'+1).style.display="none"
};
function modalOff2(){
    document.getElementById('modal-bg'+2).style.display="none"
};


