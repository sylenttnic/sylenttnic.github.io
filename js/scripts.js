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

// Naming requirements - no special characters or numbers
document.addEventListener('DOMContentLoaded', function() {
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const form = firstNameInput?.closest('form') || lastNameInput?.closest('form');

    function filterNonLetters(inputElement) {
        if (inputElement) {
            inputElement.addEventListener('input', function(event) {
                this.value = this.value.replace(/[^A-Za-z\s\-\']/g, ''); // Remove anything not a letter, space, hyphen, or apostrophe
            });
        } else {
            console.error(inputElement.id + " input element not found!");
        }
    }

    filterNonLetters(firstNameInput);
    filterNonLetters(lastNameInput);


    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
              console.log("Form submitted with firstName:", firstNameInput.value)
              console.log("Form submitted with lastName:", lastNameInput.value)
            }
        });
    } else {
        console.error("Form element not found!");
    }
});

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

// Email checker
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailaddress');
    const form = emailInput?.closest('form');

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                //If the form is invalid, prevent submission
                event.preventDefault();
                event.stopPropagation();
            } else {
              //If the form is valid, continue with submission
              console.log("Form submitted with email:", emailInput.value)
            }
        });
    } else {
        console.error("Form element not found!");
    }
});

// Character countdown for open text box
document.addEventListener('DOMContentLoaded', function() {
    function setupCharacterCounter(inputElementId, counterElementId) {
        const inputElement = document.getElementById(inputElementId);
        const counterElement = document.getElementById(counterElementId);

        if (inputElement && counterElement) {
            inputElement.addEventListener('input', function() {
                const currentLength = this.value.length;
                const maxLength = this.maxLength;
                counterElement.textContent = currentLength + " / " + maxLength + " characters";

                if (currentLength > maxLength) {
                    this.value = this.value.slice(0, maxLength);
                    counterElement.classList.add("text-danger");
                } else {
                    counterElement.classList.remove("text-danger");
                }
            });
        } else {
            console.error(inputElementId + " input or " + counterElementId + " counter element not found!");
        }
    }

    setupCharacterCounter('comments', 'comments-count');
    setupCharacterCounter('basicFeedback', 'basicFeedback-count');
});

// Minimum word count on comment box
document.addEventListener('DOMContentLoaded', function() {
    const commentsTextarea = document.getElementById('comments');
    const commentsWordCount = document.getElementById('comments-word-count');
    const minWordFeedback = document.getElementById('min-word-feedback');

    commentsTextarea.addEventListener('input', function() {
        const text = this.value.trim();
        const words = text.split(/\s+/).filter(word => word !== ""); // Split by spaces and filter out empty strings
        const wordCount = words.length;

        commentsWordCount.textContent = `${wordCount} / 15 words`;

        if (wordCount < 15) {
          commentsTextarea.setCustomValidity("Please enter at least 15 words.");
          minWordFeedback.style.display = "block"; // Show the feedback
        } else {
            commentsTextarea.setCustomValidity(""); // Reset custom validity
            minWordFeedback.style.display = "none"; // Hide the feedback
        }
    });
});

// Phone number auto-formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phonenumber');

    phoneInput.addEventListener('input', function(event) {
        let input = this.value.replace(/\D/g, ''); // Remove non-digits
        let formatted = input;

        if (input.length > 0) {
            if (input.length > 3) {
                formatted = `(${input.substring(0, 3)}) ${input.substring(3)}`;
            }
            if (input.length > 6) {
                formatted = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}`;
            }
        }

        this.value = formatted;
        // Check for validity after formatting
        if (input.length === 10) {
            this.setCustomValidity(""); // Valid
        } else {
            this.setCustomValidity("Please provide a valid 10-digit phone number."); // Invalid
        }
    });
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

        // Stop Spam
        var hiddenField = $('#email-catch').val();
        if (hiddenField != "") {
            $("#form-message").html(errorMessage);
            sendBtn.prop("disabled", false);
            sendBtn.html("Send"); // Restore original text
            return;
        }
  
        // Collect form data *inside* the AJAX call
        //$.ajax({
        //    //url: "https://script.google.com/macros/s/AKfycbzyl_S1xVn7Y_ILf_LBDrleEhfNaxbhIl7_wATezVEihR7PnW4AmLgrAWE9l0SUMPGD4Q/exec",
        //    url: "https://hnet.sylentt.com/webhook/submit-ticket",
        //    type: "POST",
        //    contentType: 'text/plain;charset=utf-8',
        //    'website-api-key': '3pPUzAwTUdGaUxXSTROVE10TjJWaE5U',
        //    data: JSON.stringify({
        //        firstName: $('#firstname').val(),
        //        lastName: $('#lastname').val(),
        //        emailAddress: $('#emailaddress').val(),
        //        phoneNumber: $('#phonenumber').val(),
        //        companyName: $('#companyName').val(),
        //        businessFunction: $('input[name="gridRadios"]:checked').val(),
        //        jobTitle: $('#jobTitle').val(),
        //        basicFeedback: $('#basicFeedback').val(),
        //        comment: $('#comments').val().replace(/\n/g, '<br>')
        //    }),
        //    success: function(response) {
        //        if (response.result === "success") {
        //            $("#form-message").html(successMessage);
        //            form[0].reset();
        //        } else {
        //            $("#form-message").html(errorMessage);
        //        }
    
                // Re-enable the button on success or error
        //        sendBtn.prop("disabled", false);
        //        sendBtn.html("Send"); // Restore original text
        //    },
        //    error: function() {
        //        $("#form-message").html(errorMessage);
    
                // Re-enable the button on error
        //        sendBtn.prop("disabled", false);
        //        sendBtn.html("Send"); // Restore original text
        //    }
        //});
        $.ajax({
    url: "https://hnet.sylentt.com/webhook/submit-ticket",
    //url: "https://hnet.sylentt.com/webhook-test/submit-ticket",
    type: "POST",
    // 👇 Change 1: Use proper JSON content type so n8n parses it automatically
    contentType: 'application/json',
    
    data: JSON.stringify({
        'website-api-key': '3pPUzAwTUdGaUxXSTROVE10TjJWaE5U',
        // 👇 Change 3: Ensure these keys match what you mapped in your Jira Node
        // You can combine fields here to make mapping easier in n8n, 
        // or keep them separate and combine them inside the n8n Expression Editor.
        summary: "New Ticket from " + $('#firstname').val() + " " + $('#lastname').val(),
        
        description: `
User: ${$('#firstname').val()} ${$('#lastname').val()}
Email: ${$('#emailaddress').val()}
Phone: ${$('#phonenumber').val()}
Company: ${$('#companyName').val()}
Function: ${$('input[name="gridRadios"]:checked').val()}
Job Title: ${$('#jobTitle').val()}
Feedback: ${$('#basicFeedback').val()}

Comments:
${$('#comments').val()}
        `,
        
        // You can still pass individual fields if you want to log them to specific columns in Sheets
        emailAddress: $('#emailaddress').val(),
        companyName: $('#companyName').val()
    }),
    
    success: function(response) {
        // ... rest of your success logic matches your previous code ...
        if (response.status === "success") { // Note: n8n usually returns "status", check your "Respond to Webhook" node
            $("#form-message").html(successMessage);
            form[0].reset();
        } else {
            $("#form-message").html(errorMessage);
        }
        sendBtn.prop("disabled", false);
        sendBtn.html("Send");
    },
    
    error: function(xhr, status, error) {
        console.error("Submission failed:", error); // Helpful for debugging
        $("#form-message").html(errorMessage);
        sendBtn.prop("disabled", false);
        sendBtn.html("Send");
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
