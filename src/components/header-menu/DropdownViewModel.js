const DropdownViewModel = (model, view) => {
    const handleToggleMenu = (menuId) => {
        const openMenu = model.setOpenMenu(menuId);
        view.toggleMenu(menuId, openMenu === menuId);
    };

    view.bindToggleMenu(handleToggleMenu);
};

export default DropdownViewModel;
