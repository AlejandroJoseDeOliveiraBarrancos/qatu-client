export const createBannerViewModel = (model, view) => {
    let currentIndex = 0;
    let bannerViews = null;

    const initializeBanner = () => {
        bannerViews = view.renderBanner(model);
        updateBanner(currentIndex);  
        setupEventListeners();
        startAutoSlide();
    };

    const updateBanner = (index) => {
        const bannerData = model[index];
        view.updateBanner(bannerData, bannerViews);

        // show active
        bannerViews.navDots.childNodes.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    };

    const showNextBanner = () => {
        currentIndex = (currentIndex + 1) % model.length;
        updateBanner(currentIndex);
    };

    const showPreviousBanner = () => {
        currentIndex = (currentIndex - 1 + model.length) % model.length;
        updateBanner(currentIndex);
    };

    const goToBanner = (index) => {
        currentIndex = index;
        updateBanner(currentIndex);
    };

    const setupEventListeners = () => {
        bannerViews.prevButton.onclick = showPreviousBanner;
        bannerViews.nextButton.onclick = showNextBanner;

        // manual navegation
        bannerViews.navDots.childNodes.forEach((dot, index) => {
            dot.onclick = () => goToBanner(index);
        });
    };

    const startAutoSlide = () => {
        setInterval(showNextBanner, 5000); 
    };

    return {
        initializeBanner
    };
};
