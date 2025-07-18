import { PROGRESS_BAR_STATE } from './Constants.js';

const increaseProgress = (progress) => {
    const newProgress = progress + PROGRESS_BAR_STATE.STEP;
    return newProgress <= PROGRESS_BAR_STATE.MAX ? newProgress : PROGRESS_BAR_STATE.MAX;
};

const isComplete = (progress) => progress === PROGRESS_BAR_STATE.MAX;

const getProgress = (progress) => progress;

export {
    increaseProgress,
    isComplete,
    getProgress
};
