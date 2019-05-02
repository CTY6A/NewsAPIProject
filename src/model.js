const apiKey = "bcebc7a888eb4ad885163a49396d5489";

export default function Model() {
    this.currNews = [];
    this.sources = [];
}

Model.prototype.GetSources = async function(){
    let url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
    let req = new Request(url);
    this.sources = (await (await fetch(req)).json()).sources;
}

Model.prototype.Load = async function(requestUrl){
    const url = `https://newsapi.org/v2/${requestUrl}&apiKey=${apiKey}`;
    let req = new Request(url);
    let res = (await (await fetch(req)).json()).articles;
    if (res) this.currNews = res.length ? res : []
    else this.currNews = [];
}
