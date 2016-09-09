import config from '../../config';
import request from 'request';

const getName = ({slackName, displayName}) => {
    return slackName ? '@' + slackName : displayName;
};

export const say = text => {
    const formData = Object.assign({text}, config.slackBot);

    request.post({
        url: 'https://slack.com/api/chat.postMessage',
        formData: formData
    });
};

export const fingerFound = fingerPrint => {
    const name = getName(fingerPrint);
    const text = `${name} is about to get tipsy!`;
    say(text);
};

export const beerPoured = ({user, beerTaps}) => {
    const name = getName(user);

    const pouredText = beerTaps.map(tap => {
        return `${tap.volumePoured} ml of "${tap.beerKeg.beerBrand.name}"`;
    }).join(' and ');

    const text = `${name} has poured ${pouredText}`;

    say(text);
};
