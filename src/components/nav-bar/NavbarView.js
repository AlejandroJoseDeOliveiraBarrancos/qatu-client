import { DOM_ATTRIBUTES } from './constants.js';

export const initializeNavbarView = (container) => {
    container.classList.add('nav-bar');
    container.setAttribute(DOM_ATTRIBUTES.ROLE, 'navigation');
};

export const renderNavbarLinks = (container, links, activeLink = '') => {
    const ulEl = document.createElement('ul');
    
    const existingContent = Array.from(container.children).filter(child => !child.classList.contains('nav-list'));
    
    links.forEach(link => {
        const liEl = document.createElement('li');
        liEl.classList.add('nav-item');

        const iconEl = document.createElement('i');
        iconEl.classList.add('fa', link.iconClass);  

        const linkTextEl = document.createElement('span');
        linkTextEl.textContent = link.text;
        
        const linkEl = document.createElement('a');
        linkEl.href = link.href;
        linkEl.appendChild(iconEl);
        linkEl.appendChild(linkTextEl);
        linkEl.classList.add('nav-link');
        
        if (link.href === activeLink) {
            linkEl.classList.add('active');
        }

        liEl.appendChild(linkEl);
        ulEl.appendChild(liEl);
    });

    ulEl.classList.add('nav-list');
    
    container.querySelectorAll('.nav-list').forEach(el => el.remove());
    
    existingContent.forEach(content => container.appendChild(content));
    container.appendChild(ulEl);
};


export const updateActiveNavbarLink = (container, activeLink) => {
    Array.from(container.querySelectorAll('a')).forEach(link => {
        link.classList.toggle('active', link.href === activeLink);
    });
};

export const bindNavbarLinkClick = (container, handler) => {
    container.addEventListener('click', event => {
        const clickedLink = event.target.closest('.nav-link');
        if (clickedLink) {
            handler(clickedLink.href);
        }
    });
};

