const accesskey="xU63CgNDAJ6PB2cb2s4rsgF_aiUYdyqDS_JhY7N7vdE";
const searchForm=document.getElementById("search-form");
const searchInput=document.getElementById("search-input");
const searchResult=document.getElementById("search-result");
const showMore=document.getElementById("show-more-button");

let keyword="";
let page=1;

async function searchImages(){
    keyword=searchInput.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response=await fetch(url);
    const data=await response.json();
    if(page===1){
        searchResult.innerHTML="";
    }

    const results=data.results;
    results.map((result)=>{
        const image=document.createElement("img");
        image.src=result.urls.small;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMore.style.display="block";
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages();
})

showMore.addEventListener("click",()=>{
    page++;
    searchImages();
})
