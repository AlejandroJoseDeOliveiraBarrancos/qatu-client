const DropdownView = (container, iconsData) => {
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    iconsData.forEach(iconData => {
        const iconDropdown = document.createElement('div');
        iconDropdown.classList.add('icon-dropdown');

        const icon = document.createElement('span');
        icon.classList.add('icon');
        icon.innerHTML = iconData.icon;

        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        dropdownMenu.innerHTML = iconData.list; 
        iconDropdown.appendChild(icon);
        iconDropdown.appendChild(dropdownMenu);
        iconContainer.appendChild(iconDropdown);
    });

    container.appendChild(iconContainer);

    const bindToggleMenu = (handler) => {
        const icons = container.querySelectorAll('.icon');
        icons.forEach((icon, index) => {
            icon.addEventListener('click', () => handler(iconsData[index].id));
        });
    };

    const toggleMenu = (menuId, isVisible) => {
        const menus = container.querySelectorAll('.dropdown-menu');
        menus.forEach((menu, index) => {
            if (iconsData[index].id === menuId) {
                menu.style.display = isVisible ? 'block' : 'none';
            } else {
                menu.style.display = 'none';
            }
        });
    };

    const closeMenusOnClickOutside = () => {
        document.addEventListener('click', (event) => {
            if (!container.contains(event.target)) {
                toggleMenu(null, false);
            }
        });
    };

    closeMenusOnClickOutside(); 

    return {
        bindToggleMenu,
        toggleMenu
    };
};

export default DropdownView;
