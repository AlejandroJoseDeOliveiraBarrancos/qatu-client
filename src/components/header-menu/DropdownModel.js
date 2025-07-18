const DropdownModel = (arrayIcons) => {
    const icons = arrayIcons;
    let openMenu = null;

    const setOpenMenu = (menuId) => {
        openMenu = openMenu === menuId ? null : menuId;
        return openMenu;
    };

    const getOpenMenu = () => openMenu;

    const getIcons = () => icons;

    return {
        setOpenMenu,
        getOpenMenu,
        getIcons
    };
};

export default DropdownModel;
