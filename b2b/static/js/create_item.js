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

      $('#item-form').html('');
      $('#myModal').modal('toggle');
      toastr.success(
        'Your item has been successfully created!'
      );

      if (json.image) {
        var imageUrl = "<img src='"+json.image+"'  class='img-responsive' />";
      } else {
        var imageUrl = "<img src='/static/images/default_image.jpg'  class='img-responsive' />";
      }

      var toDetail = "<a href='"+json.url_detail+"'>" +"<button type='button' class='btn'>View</button>";

      var idForRef = "delete-item-" + json.pk;
      var to_delete = "<a id='"+idForRef+"'>"+ "<button type='button' class='btn'>Delete</button>"+"</a>"

      $( ".row" ).prepend(
        "<div id='item-"+json.pk+"' class='col-sm-4 category-item'>"+
          '<div class="caption category-img">'+imageUrl+'</div>'+
          '<h4>'+
            toDetail+'</a>'+
          '</h4>'+to_delete+
        "</div>"
      );
    }

    // bind form using 'ajaxForm'
    $('#item-form').ajaxForm(options);
});
