$(document).ready(function() {
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

      var div_id_title = window.location.pathname + " #div_id_title";
      $( "#div_id_title" ).load(div_id_title);

      var div_id_description = window.location.pathname + " #div_id_description";
      $( "#div_id_description" ).load(div_id_description);

      var div_id_price = window.location.pathname + " #div_id_price";
      $( "#div_id_price" ).load(div_id_price);

      var current_object_url = window.location.pathname + " #refresh_object";
      $( "#refresh_object" ).load(current_object_url);

    };

    // bind form using 'ajaxForm'
    $('#update_item').ajaxForm(options);

});
