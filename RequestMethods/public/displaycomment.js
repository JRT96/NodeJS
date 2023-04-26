window.onload = function() {
    let userComments = JSON.parse(localStorage.getItem("comments"));
    displayComments();
};


function displayComments() {
    let allComments = JSON.parse(localStorage.getItem("comments"));
    let commentsSection = document.getElementById("commentBox");


    if (allComments == null) {
        document.getElementById("displayCommentBox").innerHTML = "No comments yet";
    } else {}
    for (let i = 0; i < allComments.length; i++) {
        let name = allComments[i].Username;
        let comment = allComments[i].Usercomment;

        let newComment = document.createElement("p");
        newComment.innerHTML = name + ": " + comment;
        commentsSection.appendChild(newComment);
    }

    console.log(allComments);
}
    
