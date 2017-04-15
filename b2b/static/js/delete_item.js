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
               data : { pk : item_primary_key }, // data sent with the delete request
               success : function(json) {
                   // hide the post
                 $('#item-'+item_primary_key).hide(); // hide the post on success
                 toastr.success(
                   'Your item has been successfully deleted!'
                 );
               },

               error : function(xhr,errmsg,err) {
                   // Show an error
                   $('#results').html("<div class='alert-box alert radius' data-alert>"+
                   "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
                   console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
               }
           });
       } else {
           return false;
       }
   };
});
