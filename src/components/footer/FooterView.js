export const createFooterView = (container) => {
    const renderFooter = (model) => {
        container.innerHTML = '';

        const footer = document.createElement('footer');
        footer.className = 'footer';

        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        const row = document.createElement('div');
        row.className = 'row';

        model.sections.forEach(section => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-4';

            const title = document.createElement('h5');
            title.textContent = section.title;
            col.appendChild(title);

            const linksDiv = document.createElement('div');
            linksDiv.className = 'social-icons';

            section.links.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            
                const icon = document.createElement('i');
                if (link.name === 'X') icon.className = 'fab fa-twitter';
                if (link.name === 'Instagram') icon.className = 'fab fa-instagram';
                if (link.name === 'YouTube') icon.className = 'fab fa-youtube';
                if (link.name === 'LinkedIn') icon.className = 'fab fa-linkedin';
            
                anchor.appendChild(icon);
                linksDiv.appendChild(anchor);
            });

            col.appendChild(linksDiv);
            row.appendChild(col);
        });

        containerDiv.appendChild(row);
        footer.appendChild(containerDiv);
        container.appendChild(footer);
    };

    return {
        renderFooter
    };
};