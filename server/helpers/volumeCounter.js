const volumeCounter = function (pulse, ratio = 1) {
    return parseInt(pulse * ratio);
};

export default volumeCounter;
