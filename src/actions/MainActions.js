import { readFile } from 'fs';
import { remote } from 'electron';
import { showResult } from './ResultsActions';
import util from 'util';

const { dialog } = remote;
const readFilePromisify = util.promisify(readFile);

export const openFile = () => async dispatch => {
    const [readPath] = dialog.showOpenDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (readPath) {
        dispatch(showResult(await readFilePromisify(readPath, 'utf8')));
    }
};
