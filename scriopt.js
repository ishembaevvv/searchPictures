const accessKey = "mzH0cFgOXGjICI7fHeoUz6oSPAOEm88Ltw49IvbPYyk";

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const searchMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;

const CreatePost = (el) => {
    return `
    <div class="card" style="width: 18rem;">
  <img src="${el.urls.small}" class="card-img-top" alt="...">
</div>
    `
}



async function searchImages(page) {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    let items = [];

    results.map((result) => {
        let el = CreatePost(result);
        items.push(el);
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';

        imageLink.innerHTML = el;
        searchResult.append(imageLink);
    })
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
    searchMoreBtn.style.display = 'block'
})

searchMoreBtn.addEventListener('click', () => {
    page++;
    searchImages(page);
})