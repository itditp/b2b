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
      console.log(json);
      console.log('YES');

      if (json.errors) {
        $('#photo_errors').html('ERROR:'+json.errors.title);
        return;
      }

      $( '#add_photo' ).each(function(){
        this.reset();
      }); //clean form

      $('#photo_errors').html('');
      $('#myModal2').modal('toggle');
      toastr.success('your photo has been successfully added!'
      );

      $( "#photos" ).prepend(
        "<a data-lightbox='example-set' href='"+json.photo+"'>"+
        "<img src='"+json.photo_small+"' class='img-responsive img-thumbnail' />"+
        "</a>"
      );
      
    };

    // bind form using 'ajaxForm'
    $('#add_photo').ajaxForm(options);
});
