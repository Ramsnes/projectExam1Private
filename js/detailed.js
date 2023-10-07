const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wp/v2/";
const errorMsg = document.querySelector(".loadingClass");

// getting id
function getProductId() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  return id;
}

// fetching id
async function fetchProduct(id) {
  const response = await fetch(baseUrl + `posts/${id}`);
  const data = await response.json();
  return data;
}

// render HTML
async function renderHTML() {
  try {
    const id = getProductId();
    const blog = await fetchProduct(id);
    console.log(blog);
    const uniquePost = document.getElementById("mainPostWrapper");
    uniquePost.removeAttribute("class");
    const loading = document.getElementById("loading");
    loading.remove();

    // title change dynamically
    document.title = `Jiu Jitsu | ${blog.title.rendered}`;
    // renders the title
    const header = document.getElementById("postTitle");
    header.innerHTML = blog.title.rendered;
    // renders the text
    const text = document.getElementById("postText");
    text.innerHTML = blog.excerpt.rendered;

    // Fetches the featured media data and set the image src since I had trouble using same code as in blogs.js
    const image = document.getElementById("postImg");
    fetch(blog._links["wp:featuredmedia"][0].href)
      .then((response) => response.json())
      .then((featuredMediaData) => {
        if (featuredMediaData.source_url) {
          image.src = featuredMediaData.source_url;
        } else {
          // If the featured image URL is missing, prettier than broken img icon
          image.src = "";
        }
      });
  } catch (error) {
    errorMsg.innerHTML =
      '<div class="error">There was an error. Contact online support at 555-444-333.</div>';
  }
}

renderHTML();

// Modal that expands image when clicked
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const overlay = document.createElement("div");
overlay.className = "modal-overlay";

document.body.appendChild(overlay);

document.getElementById("postImg").addEventListener("click", function () {
  modal.style.display = "block";
  overlay.style.display = "block";
  modalImage.src = this.src;
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});
