// Image  accordion slider
const images = document.querySelectorAll(".image-accordion img");
images.forEach(function (image) {
  image.onclick = function (event) {
    document
      .querySelector(".selected-image")
      .classList.remove("selected-image");
    const clickParent = event.target.parentNode;
    clickParent.classList.add("selected-image");
  };
});

// Carousel
// API fetch
const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/";
const postsUrl = "wp/v2/posts?_embed";
let currentPage = 1; // Track the current page of posts
const postsPerPage = 4; // Number of posts to display per page
let totalPosts = 0; // Total number of available posts

// Function to fetch the total number of posts
async function fetchTotalPosts() {
  try {
    const response = await fetch(`${baseUrl}${postsUrl}`);
    const data = await response.json();
    totalPosts = data.length;
  } catch (error) {
    console.error("Error fetching total posts", error);
  }
}

// Function to render the latest posts in the carousel
async function renderLatestPosts(page) {
  const carouselContainer = document.querySelector(".carousel");

  try {
    // Fade out the existing carousel items
    const existingItems = document.querySelectorAll(".carousel-item");
    existingItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transition = "opacity 0.5s ease-in-out";
    });

    // Wait for the fade-out transition to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fetch the latest posts based on the current page
    const response = await fetch(
      `${baseUrl}${postsUrl}&per_page=${postsPerPage}&orderby=date&page=${page}`
    );
    const data = await response.json();

    // Clear existing carousel items
    carouselContainer.innerHTML = "";

    // Loop through the fetched posts and create carousel items with fade-in effect
    data.forEach(function (post) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      // Create post content
      const postContent = `
        <a href="/detailed.html?id=${post.id}">
          <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
          <h3>${post.title.rendered}</h3>
        </a>
      `;

      carouselItem.innerHTML = postContent;
      carouselContainer.appendChild(carouselItem);

      // Fade-in effect to new row of 4 posts
      setTimeout(() => {
        carouselItem.style.opacity = "1";
        carouselItem.style.transition = "opacity 0.5s ease-in-out";
      }, 10);
    });
  } catch (error) {
    console.error("Error fetching and rendering latest posts", error);
  }
}

// Initializes the carousel by fetching total posts and rendering the first page
fetchTotalPosts().then(() => {
  renderLatestPosts(currentPage);
});

// Buttons
// Event listeners for next and previous buttons
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
  } else {
    // If we are on the first page, go to the last page
    currentPage = Math.ceil(totalPosts / postsPerPage);
  }
  renderLatestPosts(currentPage);
});

nextButton.addEventListener("click", () => {
  const maxPage = Math.ceil(totalPosts / postsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
  } else {
    // If we are on the last page, go back to the first page
    currentPage = 1;
  }
  renderLatestPosts(currentPage);
});
