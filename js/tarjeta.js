
// Plantas
function crearTarjetaPlanta(id,nombre,descripcion,url){
    var html = 
    '<div id="tarjeta" class="col s12 m6 l4">' +
        '<div class="card">' +
            '<div class="card-image">' +
                '<img src="'+ url + '" height="100%">' +
                '' +
                '<span class="card-title text-shadow"><strong>' +
                    nombre +
                '</strong></span>' +
            '</div>'+
            '<div class="card-content">' +
                '<p>' + descripcion + '</p>'+
            '</div>' +
            '<div class="card-action">' +
                '<a href="verPlantas.html?id='+id+'&name='+nombre+'">Ver planta</a>' +
            '</div>' +
        '</div>' +
    '</div>';

    return html;
}

//'<a href="verPlantas.html?id='+id+'&name='+nombre+'">Ver planta</a>'

// Noticias
function crearTarjetaNoticias(id,nombre,descripcion,url){
    var html = 
    '<div id="tarjeta" class="col s12 m6 l4">' +
        '<div class="card">' +
            '<div class="card-image">' +
                '<img src="'+ url + '" height="100%">' +
                '' +
                '<span class="card-title text-shadow"><strong>' +
                    nombre +
                '</strong></span>' +
            '</div>'+
            '<div class="card-content">' +
                '<p>' + descripcion + '</p>'+
            '</div>' +
            '<div class="card-action">' +
                '<a href="verPlantas.html?id='+id+'&name='+nombre+'">Ver Noticia</a>' +
            '</div>' +
        '</div>' +
    '</div>';

    return html;
}

//Zonas
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