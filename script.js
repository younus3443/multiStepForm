const arcadePrice=document.querySelector(".arcadeprice")
const advancedPrice=document.querySelector('.advancedprice')
const proPrice=document.querySelector('.proprice')
const toggle=document.querySelector(".toggle")
const free=document.querySelectorAll(".free")
const btn1=document.querySelector('.btn1')
const btn2=document.querySelector('.btn2')
const btn3=document.querySelector('.btn3')



// step3


toggle.addEventListener('click',()=>{
    if(toggle.checked){
        arcadePrice.textContent="$90/yr"
        advancedPrice.textContent= "$120/yr"
        proPrice.textContent="$150/yr"
        
        free.forEach((f)=>{
            f.textContent="2 months free"
        }) 
    }
    else{
        arcadePrice.textContent="$9/yr"
        advancedPrice.textContent= "$12/yr"
        proPrice.textContent="$15/yr"

        free.forEach((f)=>{
            f.textContent=""
        })
    }
})

function totalAmount(){
    let totalPrice=0
    btn1.addEventListener("click",()=>{
        btn4.classList.add("bg-blue-50")
        totalPrice+=Number(arcadePrice.textContent.replace(/[^0-9]/g,""))
    })
    btn2.addEventListener("click",()=>{
        btn1.classList.add("bg-blue-50")
        totalPrice+=Number(advancedPrice.textContent.replace(/[^0-9]/g,""))
    })
    btn3.addEventListener("click",()=>{
        btn3.classList.add("bg-blue-50")
        totalPrice+=Number(proPrice.textContent.replace(/[^0-9]/g,""))
    })
}
function highlight(activeBtn){
  [btn1, btn2, btn3].forEach(b => b.classList.remove("bg-blue-50"))
  activeBtn.classList.add("bg-blue-50")
}
totalAmount()