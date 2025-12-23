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
        const sendBtn = $("#send-btn");
        
        // 1. UI Feedback: Disable button immediately to prevent double-submit
        sendBtn.prop("disabled", true);
        const originalBtnText = sendBtn.html(); // Save original text
        sendBtn.html("Sending...");

        // 2. Client-side Validation
        if (!form[0].checkValidity()) {
            form.addClass('was-validated');
            $("#form-message").html(formValidationMessage); // Ensure this variable is defined globally
            
            // Re-enable button so they can fix it
            sendBtn.prop("disabled", false);
            sendBtn.html(originalBtnText);
            return;
        } else {
            form.removeClass('was-validated');
            $("#form-message").html("");
        }

        // 3. Spam Trap (Honeypot)
        if ($('#email-catch').val() !== "") {
            // Silently fail for bots, or show generic error
            $("#form-message").html(errorMessage);
            sendBtn.prop("disabled", false);
            sendBtn.html(originalBtnText);
            return;
        }

        // 4. Prepare Data for Jira/n8n
        // Using template literals (backticks) handles newlines automatically for Jira
        const ticketDescription = `
User: ${$('#firstname').val()} ${$('#lastname').val()}
Email: ${$('#emailaddress').val()}
Phone: ${$('#phonenumber').val()}
Company: ${$('#companyName').val()}
Function: ${$('input[name="gridRadios"]:checked').val()}
Job Title: ${$('#jobTitle').val()}
Feedback: ${$('#basicFeedback').val()}

Comments:
${$('#comments').val()}
        `;

        // 5. The AJAX Call
        $.ajax({
            url: "https://hnet.sylentt.com/webhook/submit-ticket", // Production URL
            type: "POST",
            contentType: 'application/json', // Critical for n8n to parse automatically
            
            data: JSON.stringify({
                // Security Key (Must match your n8n IF node)
                "website-api-key": "3pPUzAwTUdGaUxXSTROVE10TjJWaE5U", 
                
                // Mapped Fields
                summary: "New Ticket from " + $('#firstname').val() + " " + $('#lastname').val(),
                description: ticketDescription,
                emailAddress: $('#emailaddress').val(),
                companyName: $('#companyName').val()
            }),

            success: function(response) {
                // Check for "success" status from n8n response
                if (response.status === "success" || response.result === "success") {
                    $("#form-message").html(successMessage);
                    form[0].reset(); // Clear the form
                } else {
                    // n8n received it but returned a logic error
                    $("#form-message").html(errorMessage);
                }

                // Restore Button
                sendBtn.prop("disabled", false);
                sendBtn.html(originalBtnText);
            },

            error: function(xhr, status, error) {
                console.error("Submission failed:", error);
                console.log("Response:", xhr.responseText);
                
                $("#form-message").html(errorMessage);
                
                // Restore Button
                sendBtn.prop("disabled", false);
                sendBtn.html(originalBtnText);
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
