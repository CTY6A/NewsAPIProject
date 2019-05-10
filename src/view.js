const blockSize = 5;
const maxDisplayed = 40;

export default function View(model) {
    this.model = model;
    this.currDisplayed = 0;
}

function hide(element){
    document.querySelector(element).style.display = 'none';
}

function show(element){
    document.querySelector(element).style.display = 'unset';
}

View.prototype.RemoveNews = function(){
    let news = document.getElementsByClassName("newWrapper");
    while(news.length) news[0].parentNode.removeChild(news[0]);
    this.currDisplayed = 0;
    show(".failMsg");
    hide(".moreBtn");
}

View.prototype.DisplayNews = function(){
    let i = blockSize;
    const newsContainer = document.getElementById("newsContainer");
    let documentFragment = document.createDocumentFragment();
    const tpl = document.getElementById("newTpl");
    while (i-- && this.currDisplayed < this.model.currNews.length && this.currDisplayed < maxDisplayed){
        documentFragment.appendChild(CreateNew(tpl.content.cloneNode(true), this.model.currNews[this.currDisplayed++]));
    }
    newsContainer.appendChild(documentFragment);
    this.currDisplayed == this.model.currNews.length || this.currDisplayed == maxDisplayed ? hide(".moreBtn") : show(".moreBtn");
}

View.prototype.DisplaySources = async function(){
    await this.model.GetSources();
    const tpl = document.getElementById("sourceTpl");
    const filter = document.getElementById("sourceFilter");
    this.model.sources.forEach(function(src){
        let node = tpl.content.cloneNode(true).querySelector(".sourceBtn");
        node.textContent = src.name;
        node.id = src.id;
        filter.appendChild(node);
    })
}

View.prototype.DisplayRequest = async function(request){
    await this.model.Load(request);
    this.RemoveNews();
    if (this.model.currNews.length){
        hide(".failMsg");
        this.DisplayNews();
    }
}

function CreateNew(node, data){
    node.querySelector(".newPicture").style.backgroundImage = `url("${data.urlToImage}")`;
    node.querySelector(".newLink").setAttribute("href", data.url);
    node.querySelector(".newHeadline").textContent = data.title;
    node.querySelector(".newSource").textContent = data.source.name;
    node.querySelector(".newDescription").textContent = data.description;
    return node;
}
