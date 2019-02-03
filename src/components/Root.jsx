import React from 'react';
import Main from '../containers/Main';
import Update from '../containers/Update';
import Results from '../containers/Results';

const Root = () => (
    <div className="container">
        <Main />
        <Results />
        <Update />
    </div>
);

export default Root;
