fetch('test.json')
    .then(res => res.json())
    .then (data => {
        const container = document.getElementById('projectcards');
        data.projects.forEach(project => {
            const div = document.createElement('div');
            div.id = `'project'+${project.id}`;
            div.classList.add('card', 'projectcard', 'text-bg-dark');
            div.innerHTML = `
                <div class="d-flex flex-column card-body">
                    <h5 class="jost-reg colorpri projectheading">${project.heading}</h5>
                    <hr class="mx-auto" style="width: 95%; border-color: var(--primary)">
                    <p class="jost-reg colorpri">${project.html}</p>
                    <div id="project-links" class="d-flex flex-column mt-auto">
                    ${project.links.map(link => 
                        `<div class="projectlink jost-reg">${link}</div>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    });


fetch('test.json')
    .then(res => res.json())
    .then (data => {
        const blogcontainer = document.getElementById('blogcards');
        data.blogs.forEach(blog => {
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

fetch('test.json')
    .then(res => res.json())
    .then (data => {
        const techcontainer = document.getElementById('techcont');
        data.tech.forEach(tech => {
            const div = document.createElement('div');
            div.id = `${tech.id}`;
            div.classList.add('techcard', 'text-center');
            div.innerHTML = `
                <p class="mt-1 jost-light">{ ${tech.heading} }</p>
            `;
            techcontainer.appendChild(div);
        });
    });