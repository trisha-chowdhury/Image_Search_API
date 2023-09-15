const imageWrapper=document.querySelector(".images");
const searchInput=document.querySelector(".search input")
const showMore=document.querySelector(".gallery .load");
const lightbox=document.querySelector(".lightbox");
const downloadImagebutton=document.querySelector(".uil-import");
const closeimgbutton=document.querySelector(".close-icon");

const apikey="soXbrn6WhVstQmDZUEN48g1NYRbJ7YsMkIMM06xDPglA4aqYk1aZWk0i";
const perpage=11;
let currentpage=1;
let searchTerm=null;

const downloadImage=(imgURL)=>{
    //converting the received image to blob and creating its download link to download it
    fetch(imgURL).then(res=>res.blob()).then(blob=>{
        const a=document.createElement("a");
        a.href=URL.createObjectURL(blob);
        a.download=new Date().getTime();
        a.click();
    }).catch(()=>alert("Failed to download images!"));
}
const showlightbox=(name,img)=>{
    lightbox.querySelector("img").src=img;
    lightbox.querySelector("span").innerText=name;
    downloadImagebutton.setAttribute("data-img",img);
    lightbox.classList.add("show");
    document.body.style.overflow="hidden";
}

const hidelightbox=()=>{
    lightbox.classList.remove("show");
    document.body.style.overflow="auto";
}

const generateHTML=(images)=>{
    imageWrapper.innerHTML+=images.map(img=>
        `<li class="card">
            <img onclick="showlightbox('${img.photographer}','${img.src.large2x}')" src="${img.src.large2x}" alt="img">
                <div class="details">
                    <div class="photographer">
                        <i class="uil uil-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                    <button onclick="downloadImage('${img.src.large2x}');">
                        <i class="uil uil-import"></i>
                    </button>
                </div>
            </img>
        </li>`
    ).join("");
}

const getImages = (apiURL) =>{
    searchInput.blur();
    showMore.innerText="Loading.....";
    showMore.classList.add("disabled");
    fetch(apiURL,{
        headers:{Authorization:apikey}
    }).then(res=>res.json()).then(data=>{
        generateHTML(data.photos);
        showMore.innerText="Show More";
        showMore.classList.remove("disabled");
    }).catch(()=>alert("Failed to download images"));
}

const showMoreImages=()=>{
    currentpage++;
    let apiURL=`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`;
    apiURL=searchTerm? `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${perpage}`:apiURL;
    getImages(apiURL);
}

const showmoresearchImages=(e)=>{
    if(e.target.value==="") return searchTerm=null;
    if(e.key==="Enter"){
    currentpage=1;
    searchTerm=e.target.value;
    imageWrapper.innerHTML="";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}$page=1&per_page=${perpage}`);
}
}

getImages(`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`);
showMore.addEventListener("click",showMoreImages);
searchInput.addEventListener("keyup",showmoresearchImages);
closeimgbutton.addEventListener("click",hidelightbox);
downloadImagebutton.addEventListener("click",(e)=>downloadImage(e.target.dataset.img));
