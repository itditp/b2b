$(document).ready(function() {
    var url = window.location.pathname + 'edit/';
    var options = { // target element(s) to be updated with server response
        success:   showResponse,
        error: showError
        // url: url  // post-submit callback
    };

    function showError(error) {
      // console.log(error);
      toastr.error(
        'status_error:'+ error.status
      );
    };

    function showResponse(json)  {
      // console.log(json);
      // console.log('YES');

      if (json.errors) {
        $('#update_errors').html('ERROR:'+json.errors.title);
        return;
      }

      $( '#update_item' ).each(function(){
        this.reset();
      }); //clean form

      $('#update_errors').html('');
      $('#myModal').modal('toggle');
      toastr.success(
        'Your item has been successfully updated!'
      );

      var current_object_url = window.location.pathname + " #refresh_object";
      var refresh_form_get = url + " #refresh_form";

      $( "#refresh_object" ).load(current_object_url);
      $( "#refresh_form" ).load(refresh_form_get); //refresh object in form
    };

    // bind form using 'ajaxForm'
    $('#update_item').ajaxForm(options);
});



// var current_url = window.location.pathname + " #refresh_object";
// $( "#refresh_object" ).load(current_url);
//
// var refresh_form_title = url + " #id_title";
// var refresh_form_price = url + " #id_price";
// var refresh_form_image = url + " #id_image";
// var refresh_form_description = url + " #id_description";
// console.log('upppppp');
// console.log(current_url);
// console.log(refresh_form_get);
// $( "#update_item" ).load(refresh_form_title);
// $( "#id_price" ).load(refresh_form_price);
// $( "#id_image" ).load(refresh_form_image);
// $( "#id_description" ).load(refresh_form_description);
