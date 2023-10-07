let nameBox = document.getElementById("nameField");
const email = document.getElementById("email");
const subjectBox = document.getElementById("subject");
const message = document.getElementById("message");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

// Error divs
let nameErrorField = document.querySelector(".nameError");
let emailError = document.querySelector(".emailError");
let subjectError = document.querySelector(".subjectError");
let messageBoxError = document.querySelector(".messageBoxError");

form.addEventListener("submit", (e) => {
  let messages = [];

  // Name
  if (nameBox.value === "" || nameBox.value == null) {
    const errorMessage = "A full name is required. ";
    messages.push(errorMessage);

    let combinedErrorMessage = errorMessage;
    if (nameBox.value.length < 5) {
      const errorMessage2 = "Must exceed 5 characters. ";
      messages.push(errorMessage2);
      combinedErrorMessage += " " + errorMessage2;
    }
    nameErrorField.innerText = combinedErrorMessage;
  }

  if (nameBox.value.length < 5) {
    const errorMessage2 = "Full name must exceed 5 characters";
    messages.push(errorMessage2);
  }

  // Email
  if (email.value === "" || email.value == null) {
    const errorMessage = "An email address is required.";
    messages.push(errorMessage);
    emailError.innerText = errorMessage; // Set the error message for email
  }

  // Subject
  if (subjectBox.value === "" || subjectBox.value == null) {
    const errorMessage = "Please provide a subject";
    messages.push(errorMessage);
    subjectError.innerText = errorMessage; // Set the error message for subject
  }

  // Message
  if (message.value === "" || message.value == null) {
    const errorMessage = "A message is required";
    messages.push(errorMessage);
    messageBoxError.innerText = errorMessage; // Set the error message for message
  }

  if (message.value.length <= 12) {
    const errorMessage = "Message must be of 12 or more characters";
    messages.push(errorMessage);
    messageBoxError.innerText = errorMessage; // Set the error message for message length
  }

  if (message.value.length >= 100) {
    const errorMessage = "Message must be less than 100 or more characters";
    messages.push(errorMessage);
    messageBoxError.innerText = errorMessage; // Set the error message for message length
  }

  // Subject
  if (subjectBox.value.length <= 6) {
    const errorMessage = "Subject must be of 6 or more characters";
    messages.push(errorMessage);
    subjectError.innerText = errorMessage; // Set the error message for subject length
  }

  if (messages.length > 0) {
    e.preventDefault(); // Prevents page reload
    //errorElement.innerText = messages.join(" ...  "); // All error messages joined, each separated by a comma. This code not needed anymore, but kept for future coding
  }
});

// Clear error messages when input changes
nameBox.addEventListener("input", () => {
  if (nameBox.value.length >= 5) {
    nameErrorField.innerText = "";
  }
});

email.addEventListener("input", () => {
  if (email.value !== "An email address is required.") {
    emailError.innerText = "";
  }
});

subjectBox.addEventListener("input", () => {
  if (subjectBox.value !== "Please provide a subject") {
    subjectError.innerText = "";
  }
});

message.addEventListener("input", () => {
  if (
    message.value !== "A message is required" &&
    message.value !== "Message must be of 12 or more characters" &&
    message.value !== "Message must be less than 100 or more characters"
  ) {
    messageBoxError.innerText = "";
  }
});
