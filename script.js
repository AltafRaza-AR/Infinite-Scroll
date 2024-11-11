// Assuming you’ve selected your loader with a query
const loader = document.querySelector(".loader");

// To show the loader
function showLoader() {
    loader.style.display = "block";
}

// To hide the loader
function hideLoader() {
    loader.style.display = "none";
}

// Writing the Fetch Function with Async/Await
async function getInitialPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was an error fetching the posts", error);
    }
}

// Function to display posts on the page
function displayPosts(posts) {
    const postContainer = document.querySelector(".posts-container");
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        `;
        postContainer.appendChild(postElement);
    });
}

// Fetch initial posts and display them
getInitialPosts().then(posts => {
    displayPosts(posts);
});

// To detect when the user is near the bottom of the page
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        loadMorePosts();
    }
});

// The `loadMorePosts` function will handle the fetching of more posts.
async function loadMorePosts() {
    showLoader(); // Show loader animation

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await response.json();
        displayPosts(data); // Render the fetched posts
    } catch (error) {
        console.error("Error fetching more posts", error);
    } finally {
        hideLoader(); // Hide loader animation
    }
}

// Filter posts based on user input
const filterInput = document.getElementById("filter");
filterInput.addEventListener("input", filterPosts);

function filterPosts(e) {
    const searchTerm = e.target.value.toUpperCase(); // Convert input to uppercase for case-insensitive search
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const postTitle = post.querySelector(".post-title").innerText.toUpperCase();
        const postContent = post.querySelector(".post-body").innerText.toUpperCase();

        // Show or hide post based on search term
        if (postTitle.includes(searchTerm) || postContent.includes(searchTerm)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}
