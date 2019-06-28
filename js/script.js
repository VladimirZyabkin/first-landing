window.onload = function(){
    resizeImgSlider();
    setPortfolio();
}
window.onresize = function(){
    resizeImgSlider();
    resizeCarousel();
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
    //data.portfolio.style.width = data.size * 4 - 1 + "px";
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
function resizeCarousel(){
    var portfolio = document.getElementById('portfolio');
    var sizePortfolio = portfolio.getBoundingClientRect();
    var widthPortfolio = sizePortfolio.right - sizePortfolio.left; 
    if(widthPortfolio >= 959) return;
    var blocks = document.querySelectorAll('.portfolio_content_block');
    var firstBlock = blocks[0].getBoundingClientRect();
    var nextBlock = blocks[1].getBoundingClientRect();
    var fullSize = nextBlock.left - firstBlock.left;
    var clearSize = firstBlock.right - firstBlock.left;
    var countVisible = parseInt(widthPortfolio / fullSize);
    //alert(countVisible);
}