// Progression 1: create a function and fetch the api using axios

const container = document.getElementById('newsContainer')
const main = document.getElementById('main')

const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
}

function getNewsData(){
    axios.get('https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=274797695f8db2932df7c645e534139e')
    .then(response => {
        if(response.status != 200){
            throw new Error("Something went wrong")
        }
        return response.data;
    }).then(dataRecieved => {
        console.log(dataRecieved);
        log(dataRecieved)
        renderData(dataRecieved)
    }).catch(err => {
        console.log(err);
    })
}

getNewsData();
function log(data){
    console.log(data.articles[0])
}

function renderData(data){
    let articleData = data.articles

    let article0 = articleData[0]   

    const img = document.createElement('img')
    img.src = article0.image

    const date = document.createElement('p')
    let dateObj = new Date(article0.publishedAt);

    date.innerHTML = dateObj.toLocaleDateString('en-US', options);

    const title = document.createElement('h2')
    title.innerHTML = article0.title

    const desc = document.createElement('p')
    desc.innerHTML = article0.description

    main.href = article0.url;
    main.target = '_blank';

    main.append(img)
    main.append(date)
    main.append(title)
    main.append(desc)

    for (let i=1;i<10;i++){
        let  article = articleData[i]
        console.log(article)
        const div = document.createElement('a')
        div.href = article.url;
        div.target = '_blank';
        div.classList.add('newsCard')
        
        const source = document.createElement('div')
        source.innerHTML = article.source.name

        const img = document.createElement('img')
        img.src = article.image

        const date = document.createElement('p')
        let dateObj = new Date(article.publishedAt);
        date.innerHTML = dateObj.toLocaleDateString('en-US', options);

        const title = document.createElement('h2')
        title.innerHTML = article.title

        const desc = document.createElement('p')
        desc.innerHTML = article.description

        source.classList.add('source')
        date.classList.add('date')
        dateAndSource = document.createElement('div')
        dateAndSource.append(date)
        dateAndSource.append(source)
        dateAndSource.classList.add('dateAndSource')

        div.append(img)
        // div.append(source)
        div.append(dateAndSource)
        div.append(title)
        div.append(desc)

        container.append(div)
    }
}
