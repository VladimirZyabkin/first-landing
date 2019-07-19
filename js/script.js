window.onload = function(){
    resizeImgSlider();
    setPortfolio();
    resizeCarousel();
    checkNavbarExpand();
    changeSliderDataPosition();
    setNavbarSettings();
}
window.onresize = function(){
    resizeImgSlider();
    resizeCarousel();
    checkNavbarExpand();
    changeSliderDataPosition();
}
// -------- SLIDER --------------
function changeSliderDataPosition(){
    var width = document.body.clientWidth;
    var captions = document.querySelectorAll('.carousel-caption');
    var slider = document.getElementById('slider');
    var left_margin;
    if(width < 1400){
        var prev = document.querySelector('#slider .carousel-control-prev');
        left_margin = prev.clientWidth;
    }
    else{
        left_margin = (width - 960) / 2;
    }
    var captionHeight;
    for (let index = 0; index < captions.length; index++) {
        const element = captions[index];
        if(element.clientHeight == 0) continue;
        captionHeight = element.clientHeight;
    }
    var top_margin;
    if(captionHeight <= 964){
        top_margin = (slider.clientHeight - captionHeight - 23) / 2;
    }
    else top_margin = (slider.clientHeight - captionHeight) / 2;

    for (let index = 0; index < captions.length; index++) {
        const element = captions[index];
        element.style.left = left_margin + 'px';
        element.style.top = top_margin + 'px';
    }
}
// -------- CHECK NAVBAR EXPAND ---------
function checkNavbarExpand(){
    var navbar = document.getElementById('nbMenu');
    var width = document.body.clientWidth;
    //alert(width);
    if(width > 870 && navbar.classList.contains('navbar-expand-lg')){
        navbar.classList.remove('navbar-expand-lg');
        navbar.classList.add('navbar-expand-md');
    }
    else if(width <= 870 && navbar.classList.contains('navbar-expand-md')){
        navbar.classList.remove('navbar-expand-md');
        navbar.classList.add('navbar-expand-lg');
    }
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

///////////Active Navbar item
function activeItem(idx){
    var navbarLinks = document.querySelectorAll('#nbMenu ul > li > a');
    for (let index = 0; index < navbarLinks.length; index++) {
        const element = navbarLinks[index];
        if(index == idx) element.style.color = "black";
        else element.style.color = "white";
        /* if(index == idx) element.classList.add('navbar-choosen-page');
        else {
            if(element.classList.contains('navbar-choosen-page'))
                element.classList.remove('navbar-choosen-page');
        } */
    }
}
function setNavbarSettings(){
    var navbarLinks = document.querySelectorAll('#nbMenu ul > li > a');
    for (let index = 0; index < navbarLinks.length; index++) {
        if(index == 0) activeItem(index);
        const element = navbarLinks[index];
        element.onclick = function(){activeItem(index);}
    }
}