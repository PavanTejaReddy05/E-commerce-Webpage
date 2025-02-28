fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(fetchddata => {
        data = fetchddata
        totalPages = Math.ceil(data.length / ItemsPerPage);
        display(data)
    });
let data = [];
let CurrentPage = 1;
const dropdown = document.getElementById("dropdown");
const sort=document.getElementById("Sort");
sort.addEventListener("change",SortFunc);
let ItemsPerPage = parseInt(dropdown.value);
dropdown.addEventListener("change", dropdownfunc);
let main = document.querySelector("main");
let pagination = document.getElementById("pagination");
let totalPages = Math.ceil(data.length / ItemsPerPage);
let PrevButton = document.getElementById("previous");
let NextButton = document.getElementById("after");
let Cart = document.querySelector("#Cart")

Cart.addEventListener("click", ((x) => {
    window.location.href = "D:/Programming/Tasks/E-Commerce/cart/cart.html"
}))
function SortFunc(){
    let SortValue=sort.value;
    if(SortValue==="Low to High"){
        data.sort((a,b)=>a.price-b.price);
    }else if (SortValue === "High to Low"){
        data.sort((a,b)=>b.price-a.price);
    }
    
    display(data)
}
function dropdownfunc() {
    ItemsPerPage = parseInt(this.value);
    totalPages = Math.ceil(data.length / ItemsPerPage);
    CurrentPage = 1;
    display(data);
}

function display(data) {
    let start = (CurrentPage - 1) * ItemsPerPage;
    let end = start + ItemsPerPage;
    let paging = data.slice(start, end);
    let SingleItem = document.querySelector(".item")
    main.innerHTML = ""

    paging.forEach(x => {
        let template = SingleItem.cloneNode(true);
        let img = template.querySelector("img");
        let title = template.querySelector(".title");
        let description = template.querySelector(".description");
        let Price = template.querySelector(".price");

        img.setAttribute("src", x.image);
        title.textContent = x.title;
        description.textContent = x.description;
        Price.textContent =`Price: $${x.price.toFixed(2)}`;
        template.setAttribute("title", x.category);

        main.appendChild(template);
    });
    UpdtPaginationData(data);
}

function AddtoCart(button) {
    let item = button.parentElement;
    let img = item.querySelector("img").src; 
    let title = item.querySelector(".title").textContent;
    let description = item.querySelector(".description").textContent;
    let pricetext = item.querySelector(".price").textContent;
    let price = parseFloat(pricetext.replace("Price: $", ""))
    let Product = { "Image": img, "Title": title, "Description": description, "Price": price, "Quantity": 1 }

    let cart = JSON.parse(sessionStorage.getItem("Product")) || [];
    let existingItem = cart.find(item => item.Title === Product.Title);
    if (existingItem) {
        alert("Item already added in Cart")
    } else {
        cart.push(Product);
        sessionStorage.setItem("Product", JSON.stringify(cart));
        console.log("Product :" + Product);
        console.log("Successfully Added to Cart");
        window.location.href = "../cart/cart.html"
    }
}
function UpdtPaginationData(data) {
    pagination.innerHTML = "";
    let totalPages = Math.ceil(data.length / ItemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        let PageLink = document.createElement("a");
        PageLink.href = "#";
        PageLink.classList.add("page-link"); //
        PageLink.setAttribute("data-page", i);
        PageLink.textContent = i;
        if (i === CurrentPage) {
            PageLink.style.backgroundColor = "rgb(231, 203, 151)";
        }

        PageLink.addEventListener("click", (e) => {
            PagingNavigation(i)
        });
        pagination.appendChild(PageLink);
    }
}
function PagingNavigation(PageNumber) {
    CurrentPage = PageNumber;
    display(data);
}
PrevButton.addEventListener("click", () => {
    if (CurrentPage > 1) {
        CurrentPage--;
        display(data);
    }
})
NextButton.addEventListener("click", () => {
    if (CurrentPage < totalPages) {
        CurrentPage++;
        display(data);
    }
})