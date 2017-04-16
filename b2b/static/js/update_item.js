$(document).ready(function() {
    var url = window.location.pathname + 'edit/';
    var options = { // target element(s) to be updated with server response
        success:   showResponse,
        error: showError,
        url: url  // post-submit callback
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

      $('#update_item').html('');
      $('#myModal').modal('toggle');
      toastr.success(
        'Your item has been successfully updated!'
      );
    };

    // bind form using 'ajaxForm'
    $('#update_item').ajaxForm(options);
});
