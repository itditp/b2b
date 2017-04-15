// $(function() {
//
//     // Submit mail on submit
//     $('#item-form').on('submit', function(event){
//         event.preventDefault();
//         create_item();
//     });
//
//     // AJAX for sending
//     function create_item() {
//         var url_send_mail = "/goods/create/";
//         // var data = $('#item-form').serialize();
//         var formdata = $("#item-form").serializeArray();
//         var data = {};
//         $(formdata ).each(function(index, obj){
//             data[obj.name] = obj.value;
//         });
//         console.log(data);
//         $.ajax({
//             url : url_send_mail,
//             type : "POST",
//             data : data,
//             success : function(json) {
//               console.log(json);
//               console.log('YES');
//             },
//             error : function(xhr,errmsg,err) {
//               console.log('Errrr');
//             }
//         });
//     };
//
//     // This function gets cookie with a given name
//     function getCookie(name) {
//         var cookieValue = null;
//         if (document.cookie && document.cookie != '') {
//             var cookies = document.cookie.split(';');
//             for (var i = 0; i < cookies.length; i++) {
//                 var cookie = jQuery.trim(cookies[i]);
//                 // Does this cookie string begin with the name we want?
//                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
//     var csrftoken = getCookie('csrftoken');
//
//     /*
//     The functions below will create a header with csrftoken
//     */
//
//     function csrfSafeMethod(method) {
//         // these HTTP methods do not require CSRF protection
//         return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
//     }
//     function sameOrigin(url) {
//         // test that a given url is a same-origin URL
//         // url could be relative or scheme relative or absolute
//         var host = document.location.host; // host + port
//         var protocol = document.location.protocol;
//         var sr_origin = '//' + host;
//         var origin = protocol + sr_origin;
//         // Allow absolute or scheme relative URLs to same origin
//         return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
//             (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
//             // or any other URL that isn't scheme relative or absolute i.e relative.
//             !(/^(\/\/|http:|https:).*/.test(url));
//     }
//
//     $.ajaxSetup({
//         beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
//                 // Send the token to same-origin, relative URLs only.
//                 // Send the token only if the method warrants CSRF protection
//                 // Using the CSRFToken value acquired earlier
//                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//         }
//     });
//
// });




$(document).ready(function() {
    var options = { // target element(s) to be updated with server response
        success:   showResponse,  // post-submit callback
        clearForm: true,          // clear all form fields after successful submit
        resetForm: true           // reset the form after successful submit

    };

    function showResponse(json)  {
      console.log(json);
      console.log('YES');

      $('#myModal').modal('toggle');
      toastr.success(
        'Your item has been successfully created!'
      );

      if (json.image) {
        var imageUrl = "<img src='"+json.image+"'  class='img-responsive' />"
      } else {
        var imageUrl = "<img src='/static/images/default_image.jpg'  class='img-responsive' />"
      }
      var toDetail = "<a href='"+json.url_detail+"'>"

      $( ".row" ).prepend(
        "<div id='item-"+json.pk+"' class='col-sm-4 category-item'>"+
          '<div class="caption category-img">'+imageUrl+'</div>'+
          '<h3>'+
            toDetail+json.title+'</a>'+
          '</h3>'+
        "</div>"
      );
    }

    // bind form using 'ajaxForm'
    $('#item-form').ajaxForm(options);
});
