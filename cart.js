let Cart=JSON.parse(sessionStorage.getItem("Product"))||[];
const CartItem=document.querySelector(".Cart-Items");
const Item=document.querySelector(".item");
const HPage=document.querySelector("#HPage");
const Search=document.getElementById("Search");
let cross=document.querySelector(".popupcross");
CartItem.innerHTML=""
if(Cart.length>0){
    for (let i of Cart) {
        let template=Item.cloneNode(true);
        let img=template.querySelector("img");
        let title=template.querySelector(".title");
        let description=template.querySelector(".description");
        let Price=template.querySelector("#price");
        let CalPrice=template.querySelector("#CalPrice");
        let quantity=template.querySelector(".quantity p");
        let cross = template.querySelector(".cross");

    


        img.setAttribute("src",i.Image);
        title.textContent=i.Title;
        description.textContent=i.Description;
        description.setAttribute("title",i.Description)
        Price.textContent=`Price: $${(i.Price).toFixed(2)}`;
        CalPrice.textContent=`Calculated Price :$${(i.Price*i.Quantity).toFixed(2)}`;
        quantity.textContent=i.Quantity;
        // cross.addEventListener("click",()=>removeItem(i.Title,template));
        cross.addEventListener("click",()=>crossFunc(i.Title,template))
        
        CartItem.appendChild(template);
    }
    TotalPrice()
}else{
    let ptag=document.createElement("p")
    ptag.textContent="No Item Found in Cart"
    ptag.style.color="red";
    ptag.style.justifySelf="center";
    ptag.style.fontSize="Larger";
    ptag.style.fontWeight="700";
    ptag.style.background="white";
    ptag.style.margin="50px"
    CartItem.appendChild(ptag)
}
HPage.addEventListener("click",((x)=>{
    window.location.href="./index.html";
}))
Search.addEventListener("input",()=>{
    let val=Search.value.toLowerCase()
    let divs=document.querySelectorAll(".item");
    divs.forEach(item=>{
        let title=item.querySelector(".title").textContent.toLowerCase()
        if(title.includes(val)){
            item.style.display=""
        }else{
            item.style.display="none";
        }
    })
})


let pluseButtons=document.querySelectorAll(".plus")
pluseButtons.forEach(plus=>plus.addEventListener("click",plusFunc))

function plusFunc(event){
    let Item=this.closest(".item")
    let ptag=Item.querySelector(".quantity p");
    let PriceText=Item.querySelector("#price").textContent;
    let Price=parseFloat(PriceText.replace("Price: $",""));
    ptag.textContent=parseInt(ptag.textContent)+1
    UpdateCalPrice(Item,Price,ptag.textContent)
    TotalPrice()
}

let minusButtons=document.querySelectorAll(".minus");
minusButtons.forEach(minus=>minus.addEventListener("click",minusFunc));

function minusFunc(event){
    let Item=this.closest(".item")
    let ptag=Item.querySelector(".quantity p");
    let PriceText=Item.querySelector("#price").textContent;
    let Price=parseFloat(PriceText.replace("Price: $",""));
    if(parseInt(ptag.textContent)>1){
        ptag.textContent=parseInt(ptag.textContent)-1;
        UpdateCalPrice(Item,Price,ptag.textContent);
        TotalPrice();
    }
}

function UpdateCalPrice(Item,Price,Quantity){
    let CalPrice=Item.querySelector("#CalPrice");
    let TitleinCart=Item.querySelector(".title").textContent;
    foundItem=Cart.find(x=>x.Title===TitleinCart);
    if(foundItem){
        foundItem.Quantity=Quantity;
    }
    sessionStorage.setItem("Product",JSON.stringify(Cart));
    CalPrice.innerHTML=`Calculated Price :$${(Price*Quantity).toFixed(2)}`
}

function crossFunc(Title,template){
    const popup=document.getElementById("popup");
    popup.style.display="flex";
    popup.style.flexDirection="column";
    popup.style.alignItems="center";
    popup.querySelector("img").setAttribute("src",template.querySelector("img").getAttribute("src"));
    popup.querySelector("button").addEventListener("click",()=>removeItem(Title,template))
}
cross.addEventListener("click",()=>{
    const popup=document.getElementById("popup");
    popup.style.display="none";
})

function removeItem(title,Template){
    Cart=Cart.filter(Product=>Product.Title!==title);
    sessionStorage.setItem("Product",JSON.stringify(Cart));
    Template.remove();
    TotalPrice();
    const popup=document.getElementById("popup");
    popup.style.display="none";
}

function TotalPrice(){
    let CalPrices=document.querySelectorAll("#CalPrice");
    let AmountDetails=document.querySelector(".AmountDetails");
    let TotalCartTag=AmountDetails.querySelector("strong");
    let CheckOutBtn=AmountDetails.querySelector("button");
    // let TotalCartPrice=parseFloat(TotalCartTag.textContent.replace("Total Cart Price: ","").trim())||0;
    let TotalCartPrice=0;
    CalPrices.forEach((x)=>{
        let Price=parseFloat(x.textContent.split("$")[1])||0;
        TotalCartPrice=TotalCartPrice+Price;
    })
    TotalCartTag.textContent=`Cart Price: $${TotalCartPrice.toFixed(2)}`;

    CheckOutBtn.disabled=TotalCartPrice===0;
}
function CheckOutFunc(){
    // alert("Button got clicked")
    // window.location.href="../PaymentSection/PaymentSection.html";
    window.location.href="./PaymentSection.html"
}