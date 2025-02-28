let circles=document.querySelectorAll(".circle")
let lis=document.querySelectorAll("li");
// let NextBtn=document.getElementById("Next");
// let PrevBtn=document.getElementById("Prev");
let CurrentStep=1;
let AddressInputs=document.querySelectorAll(".AddressDetails input, .AddressDetails select, .AddressDetails textarea");
let AddressSubmit=document.getElementById("AddressSubmit");
let OpionPayments=document.querySelectorAll(".OptionPayment input");
let PaymentDetailsSubmit=document.querySelector("#PaymentDetailsSubmit");
let PlaceOrder=document.querySelector("#PlaceOrder");

// for(let x of Addressdetails){
//     console.log(x.innerHTML);
// }

// 
function CheckValidityFunc(){
    let allValid=true;
    AddressInputs.forEach(input=>{
        PlaceOrder.disabled=false;
        if(!input.checkValidity()){
            allValid=false;
        }
    })
    AddressSubmit.disabled=!allValid;
}

AddressInputs.forEach(input=>{
    input.addEventListener("input",CheckValidityFunc)
    
})

AddressSubmit.addEventListener("click",()=>{
    AddressSubmit.disabled=true;
    NextFunc(CurrentStep);
});

OpionPayments.forEach((PaymentOption)=>{
    PaymentOption.addEventListener("change",()=>{
        PaymentDetailsSubmit.disabled=false;
        PlaceOrder.disabled=false;
    })
})

PaymentDetailsSubmit.addEventListener("click",()=>{
    PaymentDetailsSubmit.disabled=true;
    NextFunc(CurrentStep);
})

PlaceOrder.addEventListener("click",()=>{
    PlaceOrder.disabled=true;
    alert("Order Accepted...")
    NextFunc(CurrentStep);
    setTimeout(()=>{
        window.location.href="../index/index.html"
    },3000)
})

// PrevBtn.addEventListener("click",PrevFunc);

function NextFunc(){
    if(CurrentStep<lis.length){
        CurrentStep++;
        UpdateFunc();
    }
}

function PrevFunc(){
    if(CurrentStep!==1){
        CurrentStep--;
        UpdateFunc();
    }
}

function UpdateFunc(){
    lis.forEach((li,index)=>{
        if(index<CurrentStep){
            li.classList.add("active");
            li.innerText="✔"
        }else{
            li.classList.remove("active");
            li.innerText = index + 1;
        }
    })
    // PrevBtn.disabled = CurrentStep === 1;
    // NextBtn.disabled = CurrentStep === lis.length;
}

// Inputs.forEach(input=>{
//     input.addEventListener("input",ValidateInputs)
// })
// function ValidateInputs(){
//     let InvalidtoSubmit=Array.from(Inputs).find(input=>!input.checkValidity());
//     console.log(InvalidtoSubmit)
//     Submit.disabled=InvalidtoSubmit!==undefined;
//     NextBtn.disabled = InvalidtoSubmit!==undefined;
// }
// ValidateInputs();

// Submit.addEventListener("click",()=>{
//     NextBtn=NextBtn.oninvalid
// })