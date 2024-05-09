const loadPhone = async (phoneselect="iphone") =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneselect}`);
    const data = await res.json();
    const phone = data.data;
    getPhone(phone);
}


const getPhone=(allphone) =>{
    const parent = document.getElementById("card-container");
    parent.textContent='';
    
    const hiddendiv = document.getElementById("hidden-div");
    if(allphone.length > 8){
        hiddendiv.classList.remove("hidden");
        
        const vlue = allphone.slice(9,allphone.length)
        const inneridv = document.getElementById("inner-hedden");
        inneridv.textContent='';
        for(val of vlue){
            const singlediv = document.createElement("div");
            singlediv.classList = "card bg-base-100 border-2 p-4";
            singlediv.innerHTML=`
            <figure class="bg-blue-100 py-12">
                <img src="${val.image}"alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center p-0 mt-6">
                <h2 class="card-title font-bold mb-2">${val.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <span class="text-2xl font-bold">$999</span>
                <div class="card-actions">
                <button onclick="handleShowDetail('${val.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
            `
            inneridv.appendChild(singlediv);

        }

        
    }
    else{
        hiddendiv.classList.add("hidden");
    }

    allphone=allphone.slice(0,8);

    allphone.forEach(allphone =>{
        const singleCard = document.createElement("div");
        singleCard.classList = "card bg-base-100 border-2 p-4";
        singleCard.innerHTML=`
        
        <figure class="bg-blue-100 py-12">
            <img src="${allphone.image}"alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center p-0 mt-6">
            <h2 class="card-title font-bold mb-2">${allphone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <span class="text-2xl font-bold">$999</span>
            <div class="card-actions">
            <button onclick="handleShowDetail('${allphone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>

        `;
        parent.appendChild(singleCard);
    });
    
    spinnerLoading(false);

};


const clickButton = ()=>{
    const inputfield = document.getElementById("search-input");
    const val = inputfield.value;
    loadPhone(val);
    spinnerLoading(true)
    inputfield.value ='';


}

const spinnerLoading = (istrue) =>{
    const spin = document.getElementById("loding");
    if(istrue){
        spin.classList.remove("hidden")
    }
    else{
        spin.classList.add("hidden")
    }
}


const hiddentitems=()=>{
    const items = document.getElementById("inner-hedden");
    items.classList.toggle("hidden");
}


const handleShowDetail = async (phId)=>{
    console.log(phId);
    const rese = await fetch(`https://openapi.programming-hero.com/api/phone/${phId}`);
    const val = await rese.json();
    const phd = val.data 
    modalinfo(phd)
}


const modalinfo = (phinfo) =>{
    show_details_modal.showModal()
    const imgdiv = document.getElementById("for-Img");
    // imgdiv.innerText=phinfo.name
    imgdiv.innerHTML = `
    <img src="${phinfo.image}"alt="Shoes" class="rounded-xl" />
    `
    
    const pnmae = document.getElementById("ph_name");
    pnmae.innerText = phinfo.name
    

    const infodiv = document.getElementById("ph-deta");
    infodiv.innerHTML=`
    <p><span class="font-bold">Storage: </span> ${phinfo.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size: </span> ${phinfo.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Chipset: </span> ${phinfo.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory: </span> ${phinfo.mainFeatures.memory}</p>
    <p><span class="font-bold">Release Date: </span> ${phinfo.releaseDate}</p>
    <p><span class="font-bold">Brand: </span> ${phinfo.brand}</p>
    `

    

    console.log(phinfo.image)
}

loadPhone()