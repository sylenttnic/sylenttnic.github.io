$(function () {
    // Prevent Form Submission on Enter
    $(document).on('keyup keypress', 'form input[type="text"]', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    // Update copyright year
    $('#copyright-year').html(new Date().getFullYear());

});


// Google Form Submission - Alert Message for Success or Error
const successMessage = `
<div id="google-form-success" class="alert alert-success alert-dismissible fade show text-center" role="alert">
    Success! We've recieved your message and we'll get back to you asap!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
const errorMessage = `
<div id="google-form-error" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Sorry! There was an error submitting this form, please try sending us an email at <span style="white-space:nowrap;"><a href="mailto:interviews@sylentt.com" class="alert-link">interviews@sylentt.com</a></span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
const formValidationMessage = `
<div id="google-form-error" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Oops, please check that all the required fields are filled in and re-submit!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;

// Numbering requirements
document.addEventListener('DOMContentLoaded', function() {
    const phonenumberInput = document.getElementById('phonenumber');
    const form = phonenumberInput?.closest('form');

    if (phonenumberInput) {
        phonenumberInput.addEventListener('input', function(event) {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    } else {
        console.error("Phone number input element not found!");
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            const phonenumberValue = phonenumberInput?.value;

            if (!phonenumberValue || phonenumberValue.length !== 10) {
                alert("Please enter a valid 10-digit phone number.");
                event.preventDefault();
                return;
            } else if (isNaN(phonenumberValue)) {
                alert("Please enter a valid phone number.");
                event.preventDefault();
                return;
            }

            console.log("Form submitted with phone number:", phonenumberValue);
        });
    } else {
        console.error("Form element not found!");
    }
});


$(document).ready(function() {
    $('#join-show-form').submit(function(event) {
      event.preventDefault();
  
      const form = $(this);
      const sendBtn = $("#send-btn"); // Get the send button reference
  
      // Disable the button immediately
      sendBtn.prop("disabled", true);
      sendBtn.html("Sending..."); // Optional: Change button text
  
      const validJoinForm = form[0].checkValidity();
  
      if (!validJoinForm) {
        form.addClass('was-validated');
        $("#form-message").html(formValidationMessage);
        return;
      } else {
        form.removeClass('was-validated');
        $("#form-message").html("");
      }
  
    // Collect form data *inside* the AJAX call
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzyl_S1xVn7Y_ILf_LBDrleEhfNaxbhIl7_wATezVEihR7PnW4AmLgrAWE9l0SUMPGD4Q/exec",
        type: "POST",
        contentType: 'text/plain;charset=utf-8',
        data: JSON.stringify({
          firstName: $('#firstname').val(),
          lastName: $('#lastname').val(),
          emailAddress: $('#emailaddress').val(),
          phoneNumber: $('#phonenumber').val(),
          companyName: $('#companyName').val(),
          businessFunction: $('input[name="gridRadios"]:checked').val(),
          jobTitle: $('#jobTitle').val(),
          basicFeedback: $('#basicFeedback').val(),
          comment: $('#comments').val().replace(/\n/g, '<br>')
        }),
        success: function(response) {
            if (response.result === "success") {
              $("#form-message").html(successMessage);
              form[0].reset();
            } else {
              $("#form-message").html(errorMessage);
            }
    
            // Re-enable the button on success or error
            sendBtn.prop("disabled", false);
            sendBtn.html("Send"); // Restore original text
          },
          error: function() {
            $("#form-message").html(errorMessage);
    
            // Re-enable the button on error
            sendBtn.prop("disabled", false);
            sendBtn.html("Send"); // Restore original text
          }
        });
      });
    });
  
  // Reset Google Form Fields on Success
  function resetGoogleForm() {
    $('#firstname').val("");
    $('#lastname').val("");
    $('#emailaddress').val("");
    $('#phonenumber').val("");
    $('#companyName').val("");
    $('input[name="gridRadios"]:first').prop('checked', true);
    $('#jobTitle').val("");
    $('#basicFeedback').val("");
    $('#comments').val("");
  }