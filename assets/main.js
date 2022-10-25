//import {clickADD} from "./actions.js";
let limite=15;
//let query;
const API = 'https://api.escuelajs.co/api/v1';
const btn_more=document.getElementById("btn_more");
const btn_search= document.getElementById("btn_search");
const input_search=document.getElementById("search");
function innerTemplate(Products){
    const template = Products.map((item)=>`
    <div class="main-product">
            <figure>
                <img alt="" src="${item.images[0].length>0?item.images[0]:item.category.image}">
            </figure>
            <div>
                <h3>${item.title}</h3>
                <p>Price: $ ${item.price}</p>
                <button type"button" class="add-car" onclick="clickADD(${item.id});">Add to car</buton>
            </div>   
        </div>
    `).join("");
    return template;
}
async function fetcData(urlAPI){
    const response = await fetch(urlAPI);
    const data =  await response.json();
    return data;
}
const allProducts = async (urlAPI,end)=>{
    let finalTemplate;
    let products;
    try {
        if(end>0){
            products = await fetcData(`${urlAPI}/products?limit=${end}&offset=0`);//alt +96 para comillas
            finalTemplate= innerTemplate(products);
            document.getElementById("loader").style.display = "none";
            document.getElementById("things").innerHTML=finalTemplate;
            if(limite>products.length){
                btn_more.style.display="none";
            }
        }
        else{
            products = await fetcData(`${urlAPI}/products`);
            const productsFiltered= products.filter((item)=>item.title.toLowerCase().includes(end.toLowerCase()));
            finalTemplate= innerTemplate(productsFiltered);
            document.getElementById("things").innerHTML=finalTemplate;
            console.log(productsFiltered);
        }        
    } catch(error){
        console.error(error);
    }
}
allProducts(API,limite);
btn_more.addEventListener("click",()=>{
    limite+=15;
    allProducts(API,limite);
});
input_search.addEventListener("keyup", (event)=>{
    const keyword=event.keyCode
    //const expression=/[\s]*/;
    if(keyword===13){
        const query=input_search.value;
        if(query.length>0 && query.trim()!=""){          
            allProducts(API,query);
            //console.log(expression.exec(query));
        }      
    }
});
btn_search.addEventListener("click",()=>{
    const query=input_search.value;
        if(query.length>0 && query.trim()!=""){
            allProducts(API,query);
        }
        console.log(query); 
});