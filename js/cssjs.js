titleTamano = document.getElementById('titleTamano');
inputsTamano = document.getElementById('inputsTamano');
contStick =  document.getElementById('comprasScrollable');
function alerts(){
   
    tamano = titleTamano.clientHeight +  inputsTamano.clientHeight;
    contStick.style.height = "calc ( 100vh - " + tamano + "px )";
    console.log(titleTamano );
    
}


//document.addEventListener('DOMContentLoaded', alerts);
