const params = new URLSearchParams(window.location.search);
const slug = params.get('post');

fetch('blogs.json')
  .then(res => res.json())
  .then(blogs => {
    const post = blogs.find(b => b.slug === slug);
    const container = document.getElementById('content');

    if (post) {
        console.log("Post Found at ", post)
        const div = document.createElement('div')
        div.id = "innercontent"
        div.innerHTML = `
            <h1 class="fs-1 jost-bold">${post.heading}</h1>
            <h3 class="fs-5 jost-med">${post.subheading}</h2>
            <hr>
            <p class="jost-reg">${post.html}</p>
            `
        container.appendChild(div)
        
    } else {
      container.innerHTML = '<p>Post not found.</p>';
    }
  });