// This function deletes a post in the SQL database by its id.
const deletePostHandler = async (event) => {
  // Extract postId from the URL
  const urlParts = window.location.pathname.split("/");
  const postId = urlParts[urlParts.length - 1];

  const requestBody = {
    post_id: postId,
  };

  if (postId) {
    // Send the data to the server
    const response = await fetch("/api/posts/deletePost", {
      method: "DELETE",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from server:", response);

    // Check if the deletion was successful and update the UI accordingly
    if (response.ok) {
      console.log("Successfully deleted the post.");
      document.location.replace("/dashboard");
    } else {
      // Handle error
      console.error("Failed to delete post");
    }
  }
};

// Attach event listener to all delete buttons
const deleteButtons = document.querySelectorAll(".postDeleteBtn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deletePostHandler);
});
