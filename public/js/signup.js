const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const requestBody = {
    email: email,
    password: password,
  };

  console.log("Data being sent to server:", requestBody);

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from server:", response);

    if (response.ok) {
      console.log("Sign up successful. Redirecting to homepage.");
      document.location.replace("/");
    } else {
      console.log("Failed to sign up. Status code:", response.status);
      alert("Failed to sign up");
    }
  } else {
    console.log("Email or password not provided.");
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
