const accesskey = "pfmXS8KG42es18-8JELmRT03qo2J-JTMTb88MahhA6Y"

const formE1 = document.querySelector("form")
const inputE1 = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let input = " "
let page = 1;

async function searchImages(){
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    console.log(data.results)

    if(page === 1){
        searchResults.innerHTML = ""
    }
    results.map((result)=>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const linkButton = document.createElement("button")
        linkButton.classList.add("linkButton")
        linkButton.textContent = "link"
        const imagLink = document.createElement("a")
        imagLink.href = result.links.html
        imagLink.target= "_blank"
        linkButton.appendChild(imagLink)
        const description = document.createElement("p")
        description.textContent = result.alt_description
        const author = document.createElement("h3")
        author.textContent = result.user.name
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(author)
        imageWrapper.appendChild(description)
        imageWrapper.appendChild(linkButton)
        searchResults.appendChild(imageWrapper)
    })
    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

formE1.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMore.addEventListener("click",(event)=>{
    searchImages()
})