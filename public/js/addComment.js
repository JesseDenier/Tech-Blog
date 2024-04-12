// This function creates a new comment in the SQL database, and then displays it in the HTML.
const addCommentHandler = async (event) => {
  // Gather the data from the text area on the page, and the html tag.
  const content = document.querySelector("#newCommentContentArea").value.trim();
  const postId = 1; //TODO: This should be set to be equal to the post_id of the page the user is on.

  const requestBody = {
    content: content,
    post_id: postId,
  };

  if (content && postId) {
    // Send the data to the server
    const response = await fetch("/api/comments/addComment", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from server:", response);

    if (response.ok) {
      console.log("Comment successfully added.");
      document.location.reload();
    } else {
      console.log("Failed to add comment. Status code:", response.status);
      alert("Failed to add comment");
    }
  }
};

// Attach event listener to the add button
document
  .querySelector("#newCommentSubmitBtn")
  .addEventListener("click", addCommentHandler);
