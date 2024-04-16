// This function creates a new comment in the SQL database, and then displays it in the HTML.
const addPostHandler = async (event) => {
  // Gather the data from the text area on the page, and the html tag.
  const title = document.querySelector("#newPostTitleArea").value.trim();
  const content = document.querySelector("#newPostContentArea").value.trim();

  const requestBody = {
    title: title,
    content: content,
  };

  if (title && content) {
    // Send the data to the server
    const response = await fetch("/api/posts/addPost", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from server:", response);

    if (response.ok) {
      console.log("Post successfully added.");
      document.location.replace("/");
    } else {
      console.log("Failed to add post. Status code:", response.status);
      alert("Failed to add post");
    }
  }
};

// Attach event listener to the add button
document
  .querySelector("#newPostSubmitBtn")
  .addEventListener("click", addPostHandler);
