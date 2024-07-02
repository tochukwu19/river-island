const loadMore = document.querySelector('#load-more');
const loadMoreContainer = document.querySelector('.load-more');
const loadMoreSpinner = document.querySelector('.load-more_spinner');
const products = document.querySelector('.products');

loadMore.addEventListener('click', async () => {
    loadMoreSpinner.style.display = 'block';
    loadMore.style.display = 'none';
    const nextUrl = products.getAttribute('data-next-url');

    if (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newProducts = doc.querySelector('.products');

        products.insertAdjacentHTML('beforeend', newProducts.innerHTML);
        products.setAttribute('data-next-url', doc.querySelector('.products').getAttribute('data-next-url'));

    }

    loadMoreSpinner.style.display = 'none';
    loadMore.style.display = 'block';

    if (!products.getAttribute('data-next-url')) {
        loadMoreContainer.style.display = 'none';
    }
});