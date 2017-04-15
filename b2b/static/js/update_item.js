$(document).ready(function() {
    var url = window.location.pathname + 'edit/';
    var options = { // target element(s) to be updated with server response
        success:   showResponse,
        url: url,  // post-submit callback
        clearForm: true,          // clear all form fields after successful submit
        resetForm: true           // reset the form after successful submit

    };

    function showResponse(json)  {
      console.log(json);
      console.log('YES');

      $('#myModal').modal('toggle');
      toastr.success(
        'Your item has been successfully updated!'
      );
    };

    // bind form using 'ajaxForm'
    $('#update_item').ajaxForm(options);
});
