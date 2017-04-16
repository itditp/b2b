$(document).ready(function() {
    // delete item
    $("#object_list").on('click', 'a[id^=delete-item-]', function(){
        var post_primary_key = $(this).attr('id').split('-')[2];
        // console.log(post_primary_key)
        delete_item(post_primary_key);
    });

    function delete_item(item_primary_key){
       if (confirm('are you sure you want to remove this item?')==true){
           url = '/goods/pk/delete/'.replace('pk', Number(item_primary_key));
           $.ajax({
               url : url, // the endpoint
               type : "DELETE", // http method
               data : { pk : item_primary_key },
               success : function(json) {
                 $('#item-'+item_primary_key).hide();
                 toastr.success(
                   'Your item has been successfully deleted!'
                 );
               },

               error : function(xhr,errmsg,err) {
                   // Show an error
                   toastr.error(
                     'status_error:'+ xhr.status
                   );
               }
           });
       } else {
           return false;
       }
   };

   // This function gets cookie with a given name
   function getCookie(name) {
       var cookieValue = null;
       if (document.cookie && document.cookie != '') {
           var cookies = document.cookie.split(';');
           for (var i = 0; i < cookies.length; i++) {
               var cookie = jQuery.trim(cookies[i]);
               // Does this cookie string begin with the name we want?
               if (cookie.substring(0, name.length + 1) == (name + '=')) {
                   cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                   break;
               }
           }
       }
       return cookieValue;
   }
   var csrftoken = getCookie('csrftoken');

   /*
   The functions below will create a header with csrftoken
   */

   function csrfSafeMethod(method) {
       // these HTTP methods do not require CSRF protection
       return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
   }
   function sameOrigin(url) {
       // test that a given url is a same-origin URL
       // url could be relative or scheme relative or absolute
       var host = document.location.host; // host + port
       var protocol = document.location.protocol;
       var sr_origin = '//' + host;
       var origin = protocol + sr_origin;
       // Allow absolute or scheme relative URLs to same origin
       return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
           (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
           // or any other URL that isn't scheme relative or absolute i.e relative.
           !(/^(\/\/|http:|https:).*/.test(url));
   }

   $.ajaxSetup({
       beforeSend: function(xhr, settings) {
           if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
               // Send the token to same-origin, relative URLs only.
               // Send the token only if the method warrants CSRF protection
               // Using the CSRFToken value acquired earlier
               xhr.setRequestHeader("X-CSRFToken", csrftoken);
           }
       }
   });
});
