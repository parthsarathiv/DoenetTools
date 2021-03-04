import React from 'react';
import ReactDOM from 'react-dom';
import DoenetGradebook from "../Tools/DoenetGradebook";
import { initialize } from '../imports/courseInfo';
import {
    RecoilRoot,
} from 'recoil';
initialize();

ReactDOM.render(
    <RecoilRoot>
        <DoenetGradebook />
    </RecoilRoot>, document.getElementById('root')
);
