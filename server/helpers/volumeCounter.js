const volumeCounter = function (pulse) {
    return parseInt(pulse * 0.83333333333); // 1 pulse = 0.83333333333 ml
};

export default volumeCounter;
