import React from 'react';
import { render} from 'react-dom';
import BrightnessFilter from '../../src';
import "./style.css"
const App = () => (
   
    <div>
    	<BrightnessFilter/>
    		<h1>SOME UNDER LING CONTENT</h1>

    </div>
);
render(<App />, document.getElementById("root"));