export const createBannerView = (container) => {

    const renderBanner = (banners) => {
        container.innerHTML = '';  // clean container

        // banner creation
        const bannerElement = document.createElement('div');
        bannerElement.className = 'banner-container';

        const bannerText = document.createElement('div');
        bannerText.className = 'banner-text';

        const bannerTitle = document.createElement('h1');
        bannerTitle.className = 'banner-title';
        bannerText.appendChild(bannerTitle);

        const bannerSubtitle = document.createElement('p');
        bannerSubtitle.className = 'banner-subtitle';
        bannerText.appendChild(bannerSubtitle);

        const bannerLink = document.createElement('div');
        bannerLink.className = 'banner-link';
        bannerLink.appendChild(bannerText);
        bannerElement.appendChild(bannerLink);

        // navigation arrows
        const prevButton = document.createElement('div');
        prevButton.className = 'arrow left';
        prevButton.textContent = '<';

        const nextButton = document.createElement('div');
        nextButton.className = 'arrow right';
        nextButton.textContent = '>';

        bannerElement.appendChild(prevButton);
        bannerElement.appendChild(nextButton);

        container.appendChild(bannerElement);

        // right dots
        const navDots = document.createElement('div');
        navDots.className = 'nav-dots';
        banners.forEach(() => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            navDots.appendChild(dot);
        });
        bannerElement.appendChild(navDots);

        return {
            bannerTitle,
            bannerSubtitle,
            bannerLink,
            navDots,
            prevButton,
            nextButton
        };
    };

    const updateBanner = (bannerData, bannerViews) => {
        bannerViews.bannerTitle.textContent = bannerData.title;
        bannerViews.bannerSubtitle.textContent = bannerData.subtitle;
        bannerViews.bannerLink.onclick = () => window.location.href = bannerData.link;
        container.style.backgroundImage = `url(${bannerData.image})`;
        container.style.backgroundSize = 'cover'; 
        container.style.backgroundPosition = 'center';
        container.style.backgroundRepeat = 'no-repeat';
    };    

    return {
        renderBanner,
        updateBanner
    };
};
