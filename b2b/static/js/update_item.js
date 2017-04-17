$(document).ready(function() {
    var url = window.location.pathname + 'edit/';
    var options = { // target element(s) to be updated with server response
        success:   showResponse,
        error: showError,
        url: url,  // post-submit callback

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

      var current_url = window.location.pathname + " #refresh_object";
      var refresh_form_get = url + " #id_title.val()";
      console.log('upppppp');
      console.log(current_url);
      console.log(refresh_form_get);
      $( "#refresh_object" ).load(current_url);
      // $( "#refresh_form" ).load(refresh_form_get);
    };

    // bind form using 'ajaxForm'
    $('#update_item').ajaxForm(options);
});
