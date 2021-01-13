
/*
    All File downloader
    open link(s) to the workbin(s) that back the files on the current page
*/
javascript:(function(){
    var A = Array(...document.getElementsByClassName('fa fa-file-o'))
    .map(function(x){return x.parentElement.href.split("/files")[0]});
    A = [...new Set(A)];
    A.map(function(x){if (confirm(x)==true){window.open(x)}});
})();


//Selective Workbin downloader

/*
create dl checkboxes beside file icons in workbin for selection
*/
javascript:(function(){
    let A = Array(...document.getElementsByClassName('fa fa-file-o'));
    A = A.map(function(x){
        y = document.createElement("INPUT");
        y.setAttribute("type", "checkbox");
        y.setAttribute("class", "DLselect");
        x.append(y); 
        return x;})
})();

/*
    opens files that are selected from the above checkboxes
    user still handles download location selection normally
*/

javascript:(function(){
    let A = Array(...document.getElementsByClassName('DLselect'));
    A = A.filter(function(x){return x.checked});
    A = A.map(function(x){y = x.parentElement.parentElement.children[1]; return Array(y.text,y.href)});
    A.map(function(x){if (confirm("Download:\n" + x[0])==true){window.open(x[1])}}); 
})();
