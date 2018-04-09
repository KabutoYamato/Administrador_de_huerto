
var task;
var postid;
var posturl;
var postname;
var postdescription;
var database = firebase.database().ref();
var storage = firebase.storage().ref();
var count;



//Funcion para almacenar informacion en firebase///////////////////
function WriteZonaData(id,imageurl,name,description){
    database.child('informacion_zonas/' + id).set({
        descripcion: description,
        nombre: name,
        url : imageurl
    });
    
    var updates = {};
    updates['/zonas/' + postid] = true;
    updates['/zonas/count'] = count + 1;
    var upd = database.update(updates);
    upd.then((snapshot)=>{alert("almacenado correctamente")});
    
}
/////////////////////////////////////////////////////////////////////

//Funcion para obtener el contador siguiente del id ///////////////////
function getNextKey(){
    var zoneCount = database.child('zonas/count');
    zoneCount.once('value').then( 
        function(snapshot) {
            count = snapshot.val();
            postid = 'UPQROO_Z_'+(count+1);
            WriteZonaData(postid,posturl,postname,postdescription);
        }
    );
}
///////////////////////////////////////////////////////////////////////

//Funcion para subir la imagen al storage//////////////////////////////
function saveImage(file){
    var progressed = $("#progressed");
    const name = (new Date()).toDateString().replace(" ","") + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    task = storage.child("Zonas/"+name).put(file, metadata);
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
        alert("Hace falta algun dato reviselo antes de intentarlo de nuevo")
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
