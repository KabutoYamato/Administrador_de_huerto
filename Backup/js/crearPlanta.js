
var task;
var postid;
var postname;
var postcientific;
var postdescription;
var posttaxonomy;
var postaplications;
var postqr;
var posturl;
var database = firebase.database().ref();
var storage = firebase.storage().ref();
var count;



//Funcion para almacenar informacion en firebase///////////////////
function WritePlanta(id, imageurl, name, cientific, description, taxonomy, aplications, qrcode){
    database.child('informacion_plantas/' + id).set({
        nombre: name,
        cientifico: cientific,
        descripcion: description,        
        taxonomia: taxonomy,
        aplicaciones: aplications,
        qr: qrcode,
        url : imageurl
    });
    
    var updates = {};
    updates['/plantas/' + postid] = true;
    updates['/plantas/count'] = count + 1;
    var upd = database.update(updates);
    upd.then((snapshot)=>{alert("Almacenado Correctamente en la Base de Datos")});
    
}
/////////////////////////////////////////////////////////////////////

//Funcion para obtener el contador siguiente del id ///////////////////
function getNextKey(){
    var zoneCount = database.child('plantas/count');
    zoneCount.once('value').then( 
        function(snapshot) {
            count = snapshot.val();
            postid = 'UPQROO_P_'+(count+1);
            postqr = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+postid;
            WritePlanta(postid, posturl, postname, postcientific, postdescription, posttaxonomy, postaplications, postqr);
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
    task = storage.child("Plantas/"+name).put(file, metadata);
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
    postcientific = $("#cientifico").val();
    postdescription = $("#descripcion").val();
    posttaxonomy = $("#taxonomia").val();
    postaplications = $("#aplicaciones").val();
    if(file != null && file != undefined && postname != "" && postdescription != "" && postcientific != "" && posttaxonomy != "" && postaplications != ""){
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
