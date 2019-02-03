import { RESULTS_SHOW, RESULTS_TOGGLE_COUNTRY, CLOSE } from '../../constants/ActionTypes';

const initial = {
    active: false,
    proxiesByCountries: []
};

const results = (state = initial, action) => {
    switch (action.type) {
        case RESULTS_SHOW:
            return {
                active: true,
                proxiesByCountries: action.proxiesByCountries
            };
        case RESULTS_TOGGLE_COUNTRY:
            if (action.all) {
                return {
                    ...state,
                    proxiesByCountries: state.proxiesByCountries.map(item => {
                        return {
                            ...item,
                            active: action.state
                        };
                    })
                };
            }

            return {
                ...state,
                proxiesByCountries: state.proxiesByCountries.map(item => {
                    if (item.code == action.code) {
                        return {
                            ...item,
                            active: action.state
                        };
                    }

                    return item;
                })
            };
        case CLOSE:
            return initial;
        default:
            return state;
    }
};

export default results;
