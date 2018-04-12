
var task;
var postid;
var posturl;
var postname;
var postdescription;
var database = firebase.database().ref();
var storage = firebase.storage().ref();
var count;



//Funcion para almacenar informacion en firebase///////////////////
function WriteNoticiaData(id, imageurl, name, description){
    database.child('informacion_noticias/' + id).set({
        descripcion: description,
        nombre: name,
        url : imageurl
    });
    
    var updates = {};
    updates['/noticias/' + postid] = true;
    updates['/noticias/count'] = count + 1;
    updates['/noticias/Reciente/' + postid] = true
    var upd = database.update(updates);
    upd.then((snapshot)=>{alert("Publicado Correctamente")});
}

//Funcion para obtener el contador siguiente del id ///////////////////
function getNextKey(){
    var zoneCount = database.child('noticias/count');
    zoneCount.once('value').then( 
        function(snapshot) {
            count = snapshot.val();
            postid = 'UPQROO_N_'+(count+1);
            removeKey();
            WriteNoticiaData(postid,posturl,postname,postdescription);
        }
    );
}

function removeKey(){
    database.child('noticias/Reciente/UPQROO_N_' + (count - 1)).remove();
}
///////////////////////////////////////////////////////////////////////

//Funcion para subir la imagen al storage//////////////////////////////
function saveImage(file){
    var progressed = $("#progressed");
    const name = (new Date()).toDateString().replace(" ","") + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    task = storage.child("Noticias/"+name).put(file, metadata);
    task.on('state_changed',
        function progress(snapshot){
            var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            progressed.width(percentage+'%');
        },
        function error(err){
            alert(err);
            return;
        }
    );
    task.then((snapshot) => {
        posturl = snapshot.downloadURL;
        getNextKey();

        
    }).catch((error) => {
        console.error(error);
        return;
    });
}
/////////////////////////////////////////////////////////////////////////////

//Funcion del boton guardar
$("#guardar").click(function(e){
    var file = $("#imagen").prop('files')[0];
    postname = $("#nombre").val();
    postdescription = $("#descripcion").val();
    if(file != null && file != undefined && postname != "" && postdescription != ""){
        $('.modal').modal();
        saveImage(file);
    }
    else{
        alert("Por favor, complete toda la información para continuar.");
    }              
});


//Funcion para previsualizar imagen del fileinput///////////////////////
$(function() {
    $("#imagen").change(function (){
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) 
        {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img-demo').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else
        {
            $('#img-demo').attr('src', '../img/No_Camera.png');
        }
   });
});
///////////////////////////////////////////////////////////////////////
