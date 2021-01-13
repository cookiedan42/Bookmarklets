/*  customSpeed
    replace s with a number to hardcode
*/
javascript:(function(){
    var s = parseFloat(prompt("YouTube Speed:","3"),10);
    document.getElementsByTagName("video")[0].playbackRate = s;
})();

/*
    get direct video links for videos embedded in iframes
    usually links to a video that takes up the whole browser window
*/
javascript:(function(){
    var A = Array(...document.getElementsByTagName('iframe'))
        .map(function(x){
            return x.outerHTML.split(' ')
            .filter(function(x){
                if (x.includes('src')){return x}
            })[0].split('=')[1].slice(1,-1)
        });
    A.map(function(x){if (confirm(x)==true){window.open(x)}})
})();