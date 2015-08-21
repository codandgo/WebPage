(function ($) {
    "use strict";
    $.fn.idle = function (time) {
        var o = $(this);
        o.queue(function () {
            setTimeout(function () {
                o.dequeue();
            }, time);
        });
        return this; //set idle function
    }

    $('.error').hide(); //Hide error messages 
    $('#MainResult').hide(); //we will hide this right now
    $('#form-wrapper').show(); //show main form
    $(".contact-btn").click(function () { //User clicks on Submit button

        // Fetch data from input fields.
        var js_name = $("#name").val();
        var js_email = $("#email").val();
        var js_phone = $("#phone").val();
        var js_message = $("#message").val();

        // Do a simple validation
        if (js_name == "") {
            $("#nameLb .error").fadeIn('slow').idle(1000).fadeOut('slow'); // If Field is empty, we'll just show error text inside <span> tag for 1 sec idle and then hide it with fade out.
            return false;
        }

        var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


        if (js_email == '') {
            $("#emailLb .error1").fadeIn('slow').idle(1000).fadeOut('slow');
            return false;
        }

        if (!emailReg.test(js_email)) {
            $("#emailLb .error2").fadeIn('slow').idle(1000).fadeOut('slow');
            return false;
        }

        if (js_phone == "") {
            $("#phoneLb .error").fadeIn('slow').idle(1000).fadeOut('slow');
            return false;
        }
        if (js_message == "") {
            $("#messageLb .error").fadeIn('slow').idle(1000).fadeOut('slow');
            return false;
        }

        //let's put all data together
        var myData = 'postName=' + js_name + '&postEmail=' + js_email + '&postPhone=' + js_phone + '&postMessage=' + js_message;

        jQuery.ajax({
            type: "POST",
            url: "contact.php",
            dataType: "html",
            data: myData,
            success: function (response) {
                $("#MainResult").html('<fieldset class="response">' + response + '</fieldset>');
                $("#MainResult").slideDown("slow"); //show Result 
                $("#MainContent").hide(); //hide form div slowly
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#ErrResults").html(thrownError);
            }
        });
			
        return false;
		
	

    });

})(jQuery);