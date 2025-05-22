document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Proceed with form submission
    const formData = new FormData(form);
    submitForm(formData, form);
});

function isValidEmail(email) {
    // More comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Function to submit the form
function submitForm(formData, form) {
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message. It has been sent.');
            form.reset(); // Reset the form fields
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem with your submission. Please try again.');
                }
            });
        }
    })
    .catch(error => {
        alert('Oops! There was a problem with your submission. Please try again.');
    });
}