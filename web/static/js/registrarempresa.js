/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GlobalApisLocation */

$('form').on('submit', function (event) {
    event.preventDefault();
    let form = this;
    let apiURL = GlobalApisLocation + "api/registroEmpresa";
    let parameters = $(form).serializeArray();
    disableEnableForm(form, true);
    console.log(apiURL, parameters);
    $.ajax({
        'url': apiURL,
        'type': 'POST',
        'data': JSON.stringify(parameters),
        'contentType': "application/json; charset=utf-8",
        'dataType': 'json'
    }).done(function (response) {
        console.log(response);
        if (response.estado == 1) {
            location.href = "index.html";
        } else {
            message_error(response.informacion);
            disableEnableForm(form, false);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        message_error(errorThrown);
        disableEnableForm(form, false);
    }).always(function (data) {

    });
    return false;
});
