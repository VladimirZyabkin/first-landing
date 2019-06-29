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
    var blocks = document.querySelectorAll('.portfolio_content_block');
    var portfolioMask = document.querySelector('.portfolio_content_mask');
    var firstBlock = blocks[0].getBoundingClientRect();
    var nextBlock = blocks[1].getBoundingClientRect();
    var clearSize = firstBlock.right - firstBlock.left;
    if(widthPortfolio >= 959) {
        for (let index = 0; index < blocks.length; index++) {
            const element = blocks[index];
            element.style.margin = "20px 20px 0px 0px";
        }
        portfolioMask.style.left = -(clearSize + 20) + 'px';
        return;
    }
    var countVisible = parseInt(widthPortfolio / (clearSize + 20));
    var margin;
    if(countVisible == 1){
        margin = (widthPortfolio - clearSize) / 2;
    }
    else{
        margin = (widthPortfolio - (clearSize + 20) * countVisible) / (countVisible - 1);
    }
    for (let index = 0; index < blocks.length; index++) {
        const element = blocks[index];
        element.style.margin = countVisible > 1 ? "20px " + (margin + 20) + "px 0px 0px" : "20px " + margin + "px 0px " + margin + "px";
    }
    portfolioMask.style.left = countVisible > 1 ? -(clearSize + 20 + margin) + 'px' : -(clearSize + 2 * margin) + 'px';
}