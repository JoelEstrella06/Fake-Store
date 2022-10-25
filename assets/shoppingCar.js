const API = 'https://api.escuelajs.co/api/v1';
let car=[];
const textCar=document.getElementById("counter-car");
const slidecar=document.getElementById("preview-car");
async function fetcData(urlAPI){
    const response = await fetch(urlAPI);
    const data =  await response.json();
    return data;
}
const search = async (urlAPI,id)=>{
    //let buttons_add;
    try {
        const product = await fetcData(`${urlAPI}/products/${id}`);//alt +96 para comillas
        //console.log(product);
        return product;
    } catch(error){
        console.error(error);
    }
}
function addAcumulatorToCar(size){
    if(size>0){
        textCar.innerText=size;
        textCar.style.backgroundColor="red";
        textCar.style.display="flex";
    }
    else{
        textCar.style.display="none";
        slidecar.style.display="none";
    }
}
function previewCar(car){
    let templateCar;
    //console.log(car);
    templateCar=car.map((products)=>`
    <div class="slide-preview">
        <figure>
            <img src="${products.images[0].length>0?products.images[0]:products.category.image}" alt="${products.title}">
        </figure>
        <p>${products.title}</p>
        <div class="product-quantity flex-centrado">
            <label class="flex-centrado">
                <button type="button" onclick="reduceCar(${products.id})">-</button>
                <input type="number" min="0" value="${products.cantidad}">
                <button type="button" onclick="clickADD(${products.id})">+</button>
            </label>
        </div>
    </div>`).join("<hr>");
    slidecar.innerHTML=templateCar
    addAcumulatorToCar(car.reduce((acumulartor,elements)=>acumulartor+elements.cantidad,0));
}
const clickADD=async (datos)=>{
    let position;
    const result=await search(API,datos);
    position=car.findIndex(item=>item.id===datos);
    if (position!==-1){
        car[position].cantidad=car[position].cantidad+1;
    }
    else{
        
        car.push({...result,"cantidad":1});
    }
    previewCar(car);
}

function reduceCar(id){
    indexToReduce=car.findIndex(item=>item.id===id);
    if(indexToReduce!==-1){
        const reduce = car[indexToReduce].cantidad-1;
        if(reduce<=0){
            car= car.filter((item)=> item.id!==id);
            previewCar(car);          
        }
        else{
             car[indexToReduce].cantidad=car[indexToReduce].cantidad-1;
             previewCar(car);
        }
    }
    addAcumulatorToCar(car.reduce((acumulartor,elements)=>acumulartor+elements.cantidad,0));
}

$("#icon-car").click(()=>{
    if(car.length<=0){
        slidecar.innerHTML=`
            <div class="slide-preview">
                <p>there is nothing in the car</p>
            </div>`;
    }
    $("#preview-car").slideToggle();
});
