import { increaseProgress, isComplete, getProgress } from './ProgressBarModel.js';

const ProgressBarViewModel = (model, view) => {
    let progress = 0;

    const handleIncreaseProgress = () => {
        progress = increaseProgress(progress);
        view.updateProgress(getProgress(progress), isComplete(progress));
    };

    view.bindIncreaseProgress(handleIncreaseProgress);

    view.updateProgress(getProgress(progress), isComplete(progress));
};

export default ProgressBarViewModel;
