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
        json.name+', your message has been successfully sent!'
      );
    };

    // bind form using 'ajaxForm'
    $('#mail-form').ajaxForm(options);
});

// $(function() {
//
//     // Submit mail on submit
//     $('#mail-form').on('submit', function(event){
//         event.preventDefault();
//         send_email();
//     });
//
//     // AJAX for sending
//     function send_email() {
//         var url_send_mail = "/contacts/send-email/";
//         $.ajax({
//             url : url_send_mail,
//             type : "POST",
//             data : {
//               subject : $('#subject').val(),
//               from_email : $('#from_email').val(),
//               message : $('#message').val()
//             },
//             success : function(json) {
//                 $( '#mail-form' ).each(function(){
//                     this.reset();
//                 });
//                 if (json.errors) {
//                   $('#results').prepend(
//                     "<p>"+json.errors+"</p>");
//                 }
//                 if (json.result)
//                 $('#myModal').modal('toggle');
//                 toastr.success(
//                   'Your message has been successfully sent! We will send you a reply as soon as possible.'
//                 );
//
//             },
//             error : function(xhr,errmsg,err) {
//                 $('#results').prepend(
//                   "<li><strong>"+err+"</span></li>");
//                 // console.log(xhr.status);
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
