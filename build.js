const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const projectsDir = path.join(__dirname, 'blogs', 'projects');
const outputPath = path.join(__dirname, 'apps', 'site', 'public', 'projects.json');

const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

const projects = files.map(file => {
    const raw = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
    return {
        id: file.replace('.md', ''),
        heading: raw
        .split('\n')[0]
        .replace('# ', ''),
        html: marked.parseInline(raw
            .replace(/^# .*\n?/gm, '')
            .replace(/^> .*\n?/gm, ''))
            .replace(/<a /g, '<a class="colorpri" '),
        links: raw
            .split('\n')
            .filter(line => line.startsWith('> '))
            .map(line => line.replace(/^> /, ''))
            .map(link => { return marked.parseInline(link).replace(/<a /g, '<a class="colorpri" '); })
    };
});

fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`${projects.length} projects written to ${outputPath}`);

/* Blog code */

const blogsDir = path.join(__dirname, 'blogs', 'blog');
const outputPathBlogs = path.join(__dirname, 'apps', 'site', 'public', 'blogs.json');

const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

const blogs = blogFiles.map(file => {
    const rawBlogs = fs.readFileSync(path.join(blogsDir, file), 'utf-8');
    return {
        id: file.replace('.md', ''),
        url: "/blogs/"+file.replace('.md', ''),
        heading: rawBlogs
        .split('\n')[0]
        .replace('# ', ''),
        html: marked.parseInline(rawBlogs
            .replace(/^# .*\n?/gm, '')
            .replace(/^> .*\n?/gm, '')),
        lead: marked.parseInline(rawBlogs
            .replace(/^# .*\n?/gm, '')
            .replace(/^> .*\n?/gm, ''))
            .slice(0, 75),
    };
});

fs.writeFileSync(outputPathBlogs, JSON.stringify(blogs, null, 2));
console.log(`${blogs.length} blogs written to ${outputPathBlogs}`);
