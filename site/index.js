const REPO_URL = 'https://github.com/IamPiligrim/martin-utils';

const commands = [
    { name: '/framethis', category: 'image', description: 'Wraps your image in a golden frame.' },
    { name: '/omglook', category: 'image', description: 'Puts your image between two surprised guys.' },
    { name: '/demoralize', category: 'misc', description: 'Sends a random demoralizing fact.' },
    { name: '/gaymetr', category: 'misc', description: 'Joke command: a random "% gay" value for you or another user.' },
    { name: '/stupidlaw', category: 'misc', description: 'A random weird real-world law and its punishment.' },
];

const list = document.getElementById('commands');
const empty = document.getElementById('empty');
const search = document.getElementById('search');

function render(query = '') {
    const q = query.trim().toLowerCase();
    const found = commands.filter(c => (c.name + ' ' + c.description + ' ' + c.category).toLowerCase().includes(q));

    list.replaceChildren(...found.map(c => {
        const card = document.createElement('div');
        card.className = 'card';

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = c.category;

        const code = document.createElement('code');
        code.textContent = c.args ? `${c.name}` : c.name;

        const p = document.createElement('p');
        p.textContent = c.description;

        card.append(tag, code, p);
        return card;
    }));

    empty.hidden = found.length > 0;
}

search.addEventListener('input', () => render(search.value));
document.getElementById('repo-link').href = REPO_URL;
document.getElementById('repo-link-footer').href = REPO_URL;
render();
