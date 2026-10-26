export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Main navigation');

  const toggle = document.createElement('button');
  toggle.className = 'navbar-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const list = document.createElement('ul');
  list.className = 'navbar-links';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const text = row.textContent.trim();

    // Use the author's link if one exists, otherwise build a path from the text
    let link = row.querySelector('a');
    if (!link) {
      link = document.createElement('a');
      link.href = `/${text.toLowerCase().replace(/\s+/g, '-')}`;
      link.textContent = text;
    }

    // Mark the link for the current page
    if (link.pathname === window.location.pathname) {
      link.setAttribute('aria-current', 'page');
    }

    li.append(link);
    list.append(li);
  });

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.append(toggle, list);
  block.textContent = '';
  block.append(nav);
}
