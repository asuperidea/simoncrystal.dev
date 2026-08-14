fetch('projects.json')
    .then(res => res.json())
    .then (projects => {
        const container = document.getElementById('projectcards');
        projects.forEach(project => {
            const div = document.createElement('div');
            div.id = `'project'+${project.id}`;
            div.classList.add('card', 'projectcard', 'text-bg-dark');
            div.innerHTML = `
                <div class="card-body">
                    <h5 class="jost-reg colorpri">${project.heading}</h5>
                    <hr style="width: 90%, border-color: var(--primary)">
                    <p class="jost-reg colorpri">${project.html}</p>
                    <div id="project-links">${project.links.map(link => `<p class="jost-reg">${link}</p>`).join('')}</div>
                </div
            `;
            container.appendChild(div);
        });
    });