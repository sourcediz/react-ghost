import React, { Component } from 'react';
import './style.css';
import colorFilterWarning from'./functions/colors.js'

class BrightnessFilter extends Component {
    
    constructor(props) {
    super(props);
	    this.state = {
	    	opacity : 0,
	    	brightness : 100,
	    	nightLightFilter : false,
	    	tab : true
	    };
	   this.toggleHandler = this.toggleHandler.bind(this)
	   this.inputHandler = this.inputHandler.bind(this)
  	}

 
	toggleHandler(stateField){
		const field = this.state[stateField]
		let obj = {}
		if(field){
			obj[stateField] = false
			this.setState(obj)
		}
		if(!field){
			obj[stateField] = true
			this.setState(obj)
		}
	}

	inputHandler(event,stateField){
		console.log("input")
		let obj = {}
		obj[stateField] = event.target.value
		this.setState(obj)
	}


	componentDidMount(){
  		colorFilterWarning(256,180);
  	}

     
    render() {
    	const styleOpacity = {
    		opacity : `${this.state.opacity*0.01}`
    	}

    	const tab = <div className="brightness-filter-component-option-tab" onClick={()=>{this.toggleHandler("tab")}}>{">"}</div>
    	const settings = <input type="range" min="0" max="40" value={this.state.opacity} className="slider" id="myRange" onChange={(e=>{this.inputHandler(e,"opacity")})}/>
		const toggleNightBtn = <button onClick={()=>{this.toggleHandler("nightLightFilter")}}>Toggle Night Light</button>
		const container = <div className="brightness-filter-component-option-box">{settings}{toggleNightBtn} <div onClick={()=>{this.toggleHandler("tab")}}>{"<"}</div></div>
    		

        return(
            <div className="brightness-filter-component" >

            	<div className="brightness-filter-opacity" style={styleOpacity}></div>
            	<div className={this.state.nightLightFilter ? "brightness-filter-orange" : ""}></div>
				
				{this.state.tab ? tab : container}
    		</div>

        )
    }
}
export default BrightnessFilter;