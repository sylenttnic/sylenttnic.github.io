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

// Email checker
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailaddress');
    const form = emailInput?.closest('form');

    if (emailInput) {
        // Standard email regex pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        emailInput.addEventListener('input', function() {
            const email = this.value;
            // Allow empty string if not required (though it is required in HTML)
            // But we should validate if there is content.
            // Since it is required in HTML, validity.valueMissing handles empty.
            // We only need to check pattern if not empty.
            if (email.length > 0) {
                 if (emailPattern.test(email)) {
                    this.setCustomValidity(""); // Valid
                } else {
                    this.setCustomValidity("Please provide a valid email address."); // Invalid
                }
            } else {
                // If empty, let the required attribute handle it, or reset custom validity
                // so we don't block it with "invalid format" when it's just "missing"
                this.setCustomValidity("");
            }
        });
    }

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

        // Disable the button immediately
        sendBtn.prop("disabled", true);
        sendBtn.html("Sending...");

        // Check Validity
        const validJoinForm = form[0].checkValidity();

        if (!validJoinForm) {
            form.addClass('was-validated');
            $("#form-message").html(formValidationMessage);
            
            // Fix: Re-enable button so user can try again
            sendBtn.prop("disabled", false);
            sendBtn.html("Send");
            return;
        } else {
            form.removeClass('was-validated');
            $("#form-message").html("");
        }

        // Stop Spam (Honeypot)
        var hiddenField = $('#email-catch').val();
        if (hiddenField != "") {
            $("#form-message").html(errorMessage);
            sendBtn.prop("disabled", false);
            sendBtn.html("Send");
            return;
        }

        // AJAX Submission
        $.ajax({
            url: "https://hnet.sylentt.com/webhook/submit-ticket",
            type: "POST",
            contentType: 'application/json',
            
            headers: {
                'website-api-key': '3pPUzAwTUdGaUxXSTROVE10TjJWaE5U'
            },

            data: JSON.stringify({
                summary: $('#basicFeedback').val(),
                description: $('#comments').val(),
                emailAddress: $('#emailaddress').val(),
                firstname: $('#firstname').val(),
                lastname: $('#lastname').val(),
                phonenumber: $('#phonenumber').val(),
                functionalrequest: $('input[name="gridRadios"]:checked').val(),
                jobTitle: $('#jobTitle').val(),
                companyName: $('#companyName').val()
            }),

            success: function(response) {
                if (response.status === "success") {
                    $("#form-message").html(successMessage);
                    form[0].reset();

                    // Reset character counts
                    $('#comments-count').text("0 / 10000 characters").removeClass("text-danger");
                    $('#basicFeedback-count').text("0 / 1000 characters").removeClass("text-danger");
                    $('#comments-word-count').text("0 / 15 word minimum");
                    $('#min-word-feedback').hide();
                } else {
                    $("#form-message").html(errorMessage);
                }
                // Reset Button
                sendBtn.prop("disabled", false);
                sendBtn.html("Send");
            },

            error: function(xhr, status, error) {
                console.error("Submission failed:", error);
                $("#form-message").html(errorMessage);
                // Reset Button
                sendBtn.prop("disabled", false);
                sendBtn.html("Send");
            }
        });
    });
});
  

// Navbar Behavior: Auto-collapse on link click and click outside
document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.getElementById('navbarResponsive');
    const menuToggle = document.querySelector('.navbar-toggler');

    if (navbarCollapse && menuToggle) {
        // Collapse on link click
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    menuToggle.click();
                }
            });
        });

        // Collapse on click outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navbarCollapse.contains(event.target);
            const isClickOnToggler = menuToggle.contains(event.target);

            if (navbarCollapse.classList.contains('show') && !isClickInsideMenu && !isClickOnToggler) {
                menuToggle.click();
            }
        });
    }
});
