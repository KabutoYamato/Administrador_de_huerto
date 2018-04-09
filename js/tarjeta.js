function crearTarjetaPlanta(id,nombre,descripcion,url){
    var html = 
    '<div id="tarjeta" class="col s12 m6 l4" style="height: 45%">' +
        '<div class="card" style="height: 100%">' +
            '<div class="card-image" style="height: 60%;">' +
                '<img src="'+ url + '" height="100%">' +
                '<a class="btn-floating halfway-fab waves-effect waves-light green darken-3"><i class="material-icons">mode_edit</i></a>' +
                '<span class="card-title blue-text text-darken-2"><strong>' +
                    nombre +
                '</strong></span>' +
            '</div>'+
            '<div class="card-content" style="height:20%;">' +
                '<p>' + descripcion + '</p>'+
            '</div>' +
            '<div class="card-action" style="height:20%;>' +
                '<a href="verPlantas.html?id='+id+'&name='+nombre+'">Ver plantas</a>' +
            '</div>' +
        '</div>' +
    '</div>';

    return html;
}



function crearTarjetaZona(id,nombre,descripcion,url){
    var html = 
    '<div id="tarjeta" class="col s12 m6 l4">' +
        '<div class="card">' +
            '<div class="card-image" style="height: 30%;">' +
                '<img src="'+ url + '" height="100%">' +
                '<a class="btn-floating halfway-fab waves-effect waves-light green darken-3"><i class="material-icons">mode_edit</i></a>' +
                '<span class="card-title blue-text text-darken-2"><strong>' +
                    nombre +
                '</strong></span>' +
            '</div>'+
            '<div class="card-content" style="height:10%;">' +
                '<p>' + descripcion + '</p>'+
            '</div>' +
            '<div class="card-action">' +
                '<a href="verPlantas.html?id='+id+'&name='+nombre+'">Ver plantas</a>' +
            '</div>' +
        '</div>' +
    '</div>';

    return html;
}