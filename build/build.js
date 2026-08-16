const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const rootDir = path.join(__dirname, '..');
const projectsDir = path.join(rootDir, 'build', 'projects');
const blogsDir = path.join(rootDir, 'build', 'blog');
const techDir = path.join(rootDir, 'build', 'tech');
const outputPath = path.join(rootDir, 'apps', 'site', 'public', 'test.json');

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
            .map(link => marked.parseInline(link).replace(/<a /g, '<a class="colorpri" '))
    };
});

const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

const blogs = blogFiles.map(file => {
    const rawBlogs = fs.readFileSync(path.join(blogsDir, file), 'utf-8');
    return {
        slug: file
            .replace('.md', '')
            .replaceAll(' ', ''),
        heading: rawBlogs
            .split('\n')[0]
            .replace('# ', ''),
        subheading: rawBlogs
            .split('\n')[1]
            .replace('## ', ''),
        lead: rawBlogs
            .split('\n')[2]
            .split(' ')
            .slice(0, 50)
            .join(' '),
        html: marked.parseInline(rawBlogs
            .split('\n')
            .slice(2)
            .join('\n'))
    };
});

const techFiles = fs.readdirSync(techDir).filter(f => f.endsWith('.md'));

const tech = techFiles.map(file => {
    const rawTech = fs.readFileSync(path.join(techDir, file), 'utf-8');
    return {
        heading: rawTech
            .split('\n')[0]
            .replace('# ', ''),
        more: marked.parseInline(rawTech.split('\n')[1]),
        id: file.replace('.md', '')
    };
});

const data = { projects, blogs, tech };
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log(outputPath);
console.log('');
