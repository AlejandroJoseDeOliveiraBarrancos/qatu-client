const ProgressBarView = (container) => {
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    container.appendChild(progressBar);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '10px';
    const increaseButton = document.createElement('button');
    increaseButton.textContent = 'Increase Progress';
    buttonContainer.appendChild(increaseButton);
    document.body.appendChild(buttonContainer);

    const bindIncreaseProgress = (handler) => {
        increaseButton.addEventListener('click', handler);
    };

    const updateProgress = (progress, isComplete) => {
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;

        if (isComplete) {
            progressBar.classList.add('complete');
        } else {
            progressBar.classList.remove('complete');
        }
    };

    return {
        bindIncreaseProgress,
        updateProgress
    };
};

export default ProgressBarView;
