fetch('blogs.json')
    .then(res => res.json())
    .then (blogs => {
        const blogcontainer = document.getElementById('blogcards');
        blogs.forEach(blog => {
            const div = document.createElement('div');
            div.id = `'blog'+${blog.id}`;
            div.classList.add('card', 'blogcard', 'text-bg-dark');
            div.innerHTML = `
                <div class="card-body">
                    <h5 class="fs-2 jost-med colorpri">${blog.heading}</h5>
                    <h6 class="jost-med colorpri">${blog.subheading}</h6>
                    <hr style="width: 90%, border-color: var(--primary)">
                    <p class="jost-reg colorpri">${blog.lead}...</p>
                    <a href="blog.html?post=${blog.slug}" class="colorpri"><p class="jost-reg">Read More</p></a>
                </div
            `;
            blogcontainer.appendChild(div);
        });
    });