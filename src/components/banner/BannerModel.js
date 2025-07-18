export const createBannerModel = (bannersData) => {
    const validateBannersArray = (value) => {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('The banners array must have elements.');
        }
        return value;
    };

    const createBannerModels = (bannersArray) => {
        return bannersArray.map((bannerData) => {
            const { title, subtitle, link, image } = bannerData;
            return {
                title,
                subtitle,
                link,
                image
            };
        });
    };

    return createBannerModels(validateBannersArray(bannersData));
};
