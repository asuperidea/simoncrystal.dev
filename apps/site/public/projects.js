fetch('projects.json')
    .then(res => res.json())
    .then (projects => {
        const container = document.getElementById('projectbox');
        projects.forEach(project => {
            const div = document.createElement('div');
            div.id = 'project';
            div.innerHTML = `
                <div id="project-head">
                    <p class="raleway-reg subheading" style="text-align: center;">${project.heading}</p>
                </div>
                <hr style="margin-bottom: -1rem;">
                <div id="project-body"><p class="jost-reg">${project.html}</p></div>
                <hr style="margin-bottom: 1rem;">
                <div id="project-links">${project.links.map(link => `<p class="jost-reg">${link}</p>`).join('')}</div>
            `;
            container.appendChild(div);
        });
    });