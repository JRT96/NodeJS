let comments = [];

function saveComment() {
    let name = document.getElementById("nameBox").value;
    let comment = document.getElementById("commentBox").value;
    let commentObj = {
        Username: name,
        Usercomment: comment
    }
    let allComments = JSON.parse(localStorage.getItem("comments"));
    if (allComments == null) {
        allComments = [];
    }

    if (!name || !comment) {
        alert("Please fill in the fields");
    } 
    else {
        alert("Comment has been saved")
        comments.push(commentObj);
        window.localStorage.setItem("comments", JSON.stringify(comments));
        console.log(comments);
        document.getElementById("nameBox").value = "";
        document.getElementById("commentBox").value = "";
    }
    
}