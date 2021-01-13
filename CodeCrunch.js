/*
    click on all codecrunch file download links
    prevents accidentally missing out or double clicking files
*/
javascript:(function(){
    var A = Array(...document.getElementsByClassName('file')).map(function(x){return x.children[0].children.item(1)});
    A.map(function(x){if (confirm(x)==true){window.open(x)}})
})();