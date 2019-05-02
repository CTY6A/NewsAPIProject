import './style.css';

import Model from './model.js';
import View from './view.js';

let model = new Model();
let view = new View(model);

document.getElementById("moreBtn").onclick = view.DisplayNews.bind(view);

view.DisplaySources();
view.DisplayRequest("top-headlines?country=us");

document.getElementById("sourceFilter").addEventListener("click", (e) =>{
    view.DisplayRequest(`everything?sources=${e.target.id}`);
});

document.getElementById("requestBtn").addEventListener("click", (e) =>{
    e.preventDefault();
    const req = document.getElementById("requestInput").value;
    if (req.trim()) view.DisplayRequest(`top-headlines?q=${req}`)
    else view.DisplayRequest("top-headlines?country=us");
});

document.getElementById("requestInput").addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.keyCode == 13) document.getElementById("requestBtn").click();
});
