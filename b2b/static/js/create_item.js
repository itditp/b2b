$(document).ready(function() {
    var options = { // target element(s) to be updated with server response
        success:   showResponse,
        error: showError

    };

    function showError(error) {
      // console.log(error);
      toastr.error(
        'status_error:'+ error.status
      );
    }

    function showResponse(json)  {
      // console.log(json);
      // console.log('YES');

      if (json.errors) {
        $('#create_errors').html('ERROR:'+json.errors.title);
        return;
      }

      $( '#item-form' ).each(function(){
        this.reset();
      }); //clean form

      $('#create_errors').html('');
      $('#myModal').modal('toggle');
      toastr.success(
        'Your item has been successfully created!'
      );

      $( "#object_list" ).load('/goods/ #object_list');

    }

    // bind form using 'ajaxForm'
    $('#item-form').ajaxForm(options);
});
