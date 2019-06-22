window.onload = function(){
    resizeImgSlider();
    setPortfolio();
}
window.onresize = function(){
    resizeImgSlider();
}
// -------- RESIZE ---------
function resizeImgSlider(){
    var elements = document.querySelectorAll('div#slider > .carousel-inner > .carousel-item > img');
    for (let index = 0; index < elements.length; index++) {
        var element = elements[index];
        element.style.width = window.innerWidth + "px"; 
        
    }
}
// -------- PORTFOLIO CAROUSEL ---------
function getPortfolioData(){
    var elem = document.querySelectorAll('#portfolio .portfolio_content_block');
    var firstBlock = elem[0].getBoundingClientRect();
    var nextBlock = elem[1].getBoundingClientRect();
    var size = nextBlock.left - firstBlock.left;
    var portfolio = document.getElementById('portfolio');
    var portfolioMask = document.querySelector('.portfolio_content_mask');
    return {
        size: size,
        portfolio: portfolio,
        portfolioMask: portfolioMask
    };
}
function setPortfolio(){
    var data = getPortfolioData();
    data.portfolio.style.width = data.size * 4 - 1 + "px";
    data.portfolioMask.style.width = data.size * data.portfolioMask.children.length + 'px';
    data.portfolioMask.style.left = -data.size + 'px';
}
function pressLeft(){
    var data = getPortfolioData();
    data.portfolioMask.removeChild(data.portfolioMask.children[data.portfolioMask.children.length - 1]);
    var clonePMask = data.portfolioMask.cloneNode(true);
    data.portfolioMask.insertBefore(clonePMask.children[clonePMask.children.length - 2], data.portfolioMask.childNodes[0]);
}
function pressRight(){
    var data = getPortfolioData();
    data.portfolioMask.removeChild(data.portfolioMask.children[0]);
    var clonePMask = data.portfolioMask.cloneNode(true);
    data.portfolioMask.appendChild(clonePMask.children[1]);
}
// -------- PORTFOLIO CAROUSEL ---------
var portfolioIdx = 0;
function selectPortfolio(course){
    var elem = document.querySelectorAll('#portfolio .portfolio_content_block');
    var count = elem.length;
    if(portfolioIdx + course < 0 || portfolioIdx + course >= count) return;
    
    elem[portfolioIdx].classList.remove('checked');
    elem[portfolioIdx].classList.add('unchecked');
    elem[portfolioIdx].children[0].classList.remove('portfolio_opacity');

    portfolioIdx += course;

    elem[portfolioIdx].classList.remove('unchecked');
    elem[portfolioIdx].classList.add('checked');
    elem[portfolioIdx].children[0].classList.add('portfolio_opacity');

    var elem = document.querySelectorAll('#portfolio-arrows .arrow');
    if(portfolioIdx == 0)
    {
        if(elem[0].classList.contains('pressed'))
        {
            elem[0].classList.remove('pressed');
        }
    }
    else if(portfolioIdx == count - 1)
    {
        if(elem[1].classList.contains('pressed'))
        {
            elem[1].classList.remove('pressed');
        }
    }
    else
    {
        if(!elem[0].classList.contains('pressed'))
        {
            elem[0].classList.add('pressed');
        }
        if(!elem[1].classList.contains('pressed'))
        {
            elem[1].classList.add('pressed');
        }
    }
}

// -------- SERVICES CLICK ---------
var servicesIdx = 0;
function servicesClick(elem){
    
}