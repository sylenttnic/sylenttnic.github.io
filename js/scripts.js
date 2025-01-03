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
    Sorry! There was an error submitting this form, please try sending us an email at <span style="white-space:nowrap;"><a href="mailto:nic@budget-therapy.com" class="alert-link">nic@budget-therapy.com</a></span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
const formValidationMessage = `
<div id="google-form-error" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Oops, please check that all the required fields are filled in and re-submit!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;


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


// Submit Google Form
$(document).ready(function() { // Ensure DOM is fully loaded

    $('#join-show-form').submit(function(event) { // Use .submit() event handler
      event.preventDefault(); // Prevent default form submission
  
      var form = $(this); // Cache the form element
      var validJoinForm = form[0].checkValidity(); // Check form validity
  
      if (!validJoinForm) {
        form.addClass('was-validated');
        $("#form-message").html(formValidationMessage);
        return; // Stop execution if form is invalid
      } else {
        form.removeClass('was-validated');
        $("#form-message").html("");
      }
  
      // Now collect the data - guaranteed to be after submit and validation
      var formData = {
        firstName: $('#firstname').val(),
        lastName: $('#lastname').val(),
        emailAddress: $('#emailaddress').val(),
        phoneNumber: $('#phonenumber').val(),
        companyName: $('#companyName').val(),
        businessFunction: $('input[name="gridRadios"]:checked').val(),
        jobTitle: $('#jobTitle').val(),
        basicFeedback: $('#basicFeedback').val(),
        comment: $('#comments').val().replace(/\n/g, '<br>')
      };
  
      // Disable submit button and show spinner
      $("#send-btn").prop("disabled", true).html("<div class='spinner-border text-light' style='vertical-align: middle; height: 1.5rem; width: 1.5rem;'></div>");
  
      // Submit Google Form using the formData object
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzyl_S1xVn7Y_ILf_LBDrleEhfNaxbhIl7_wATezVEihR7PnW4AmLgrAWE9l0SUMPGD4Q/exec",
        data: JSON.stringify(formData), // Use the formData object
        type: "POST",
        redirect: "follow",
        contentType: 'text/plain;charset=utf-8',
        complete: function(e) {
          $("#send-btn").html("Send").prop("disabled", false); // Re-enable button
          if (e.status === 200 && e.responseJSON.result === "success") {
            $("#form-message").html(successMessage);
            form[0].reset(); // Reset the form
          } else {
            $("#form-message").html(errorMessage);
          }
        }
      });
    });
  });