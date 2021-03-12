/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global store, GlobalApisLocation */

function logOff() {
    store.session.set("userdata", undefined);
    location.href = "index.html";
}

function getUserConected() {
    let dataUser = store.session.get("userdata");
    if (dataUser !== null) {
//        if (dataUser.hasOwnProperty("datos")) {
//            let data = JSON.parse(dataUser.datos);
//            if(data.rol_id === 1){
//                location.href = "administrador.html";
//            } else if(data.rol_id === 2){
//                location.href = "empresa.html";
//            } if(data.rol_id === 3){
//                location.href = "cliente.html";
//            }
//        }
    }
}


$('form').on('submit', function (event) {
    event.preventDefault();
    let form = this;
    let apiURL = GlobalApisLocation + "api/login";
    let parameters = new $(form).serializeArray();
    console.log(parameters);
    disableEnableForm(form, true);
    $.ajax({
        'url': apiURL,
        'type': 'POST',
        'data': JSON.stringify(parameters),
        'contentType': "application/json; charset=utf-8",
        'dataType': 'json'
    }).done(function (response) {
        console.log(response);
        if (response.estado == 1) {
            store.session.set("userdata", response);
            getUserConected();
        } else {
            message_error(response.informacion);
            disableEnableForm(form, false);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        message_error(errorThrown);
        disableEnableForm(form, false);
    }).always(function (data) {

    });
});