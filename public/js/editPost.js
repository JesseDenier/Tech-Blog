// This function creates edits an existing post in the SQL database.
const editPostHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Gather the data from the text area on the page, and the html tag.
  const urlParts = window.location.pathname.split("/");
  const id = urlParts[urlParts.length - 1].match(/\d+/)[0];
  const title = document.querySelector("#editPostTitleArea").value.trim();
  const content = document.querySelector("#editPostContentArea").value.trim();

  const requestBody = {
    id: id,
    title: title,
    content: content,
  };

  if (id && title && content) {
    // Send the data to the server
    const response = await fetch("/api/posts/editPost", {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from server:", response);

    if (response.ok) {
      console.log("Post successfully edited.");
      document.location.replace("/dashboard");
    } else {
      console.log("Failed to edit post. Status code:", response.status);
      alert("Failed to edit post");
    }
  }
};

// Attach event listener to the submit button
document
  .querySelector("#editPostSubmitBtn")
  .addEventListener("click", editPostHandler);
