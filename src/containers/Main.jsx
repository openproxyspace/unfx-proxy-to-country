import React from 'react';
import { connect } from 'react-redux';
import { openFile } from '../actions/MainActions';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

const Main = ({ openFile }) => (
    <div className="main-page-container">
        <div className="main-page-content">
            <button onClick={openFile}>Open File</button>
        </div>
    </div>
);

export default connect(
    null,
    { openFile }
)(Main);
