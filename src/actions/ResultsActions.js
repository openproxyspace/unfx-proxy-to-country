import { sort } from 'js-flock';
import { writeFile } from 'fs';
import { lookup, codes } from '../core/country';
import { uniq } from '../misc/other';
import { remote } from 'electron';
import { RESULTS_SHOW, RESULTS_TOGGLE_COUNTRY, CLOSE } from '../constants/ActionTypes';

const { dialog } = remote;

const findProxies = text => {
    try {
        return uniq(text.match(new RegExp('[1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[:][1-9]?[0-9]{1,5}', 'g')));
    } catch (error) {
        throw new Error('No proxies found!');
    }
};

export const showResult = text => dispatch => {
    try {
        const res = [];
        const countries = {};
        const proxies = findProxies(text);

        proxies.forEach(item => {
            const [ip] = item.split(':');
            const code = lookup(ip);

            if (countries[code] == undefined) {
                countries[code] = {
                    code,
                    ...codes[code],
                    items: [item]
                };
            } else {
                countries[code].items.push(item);
            }
        });

        Object.keys(countries).forEach(item => {
            res.push({
                ...countries[item],
                active: true
            });
        });

        dispatch({
            type: RESULTS_SHOW,
            proxiesByCountries: sort(res).desc(item => item.items.length)
        });
    } catch (error) {
        alert(error);
    }
};

export const toggleCountry = (code, state, all) => ({
    type: RESULTS_TOGGLE_COUNTRY,
    code,
    state,
    all
});

export const save = () => (dispatch, getState) => {
    const savePath = dialog.showSaveDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (savePath) {
        const {
            results: { proxiesByCountries }
        } = getState();

        const results = proxiesByCountries
            .filter(item => item.active)
            .map(item => item.items)
            .flat();

        writeFile(savePath, results.join('\r\n'), () => null);
    }
};

export const close = () => ({
    type: CLOSE
});
