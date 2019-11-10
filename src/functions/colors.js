//Conver Colour to HSL Value
function colorToHsl(colorString){
  
  if(colorString === "rgb(0, 0, 0)" || colorString === "rgb(255, 255, 255)" ){
    return false
  }
  let colorValue = colorString;
  
  //Check if hex value then convert to rgb INTS
  if(colorValue.includes("#")){
    //Remove Symbols
    colorValue = colorValue.replace('#','');

    //Convert hex values from 16 bit to 1 bit
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    colorValue = [r,g,b];
  }

  //Convert RGB String to INTS
  if(colorValue.includes("rgb")){
    //Remove Alphpa

    colorValue = colorValue.replace("ba","b")

    //Splice into 3 Seperate values
    colorValue = colorValue.split("(")[1].split(")")[0];
    colorValue = colorValue.split(", ");
  }
  
    var r1 = colorValue[0] / 255;
    var g1 = colorValue[1] / 255;
    var b1 = colorValue[2] / 255;
 
    var maxColor = Math.max(r1,g1,b1);
    var minColor = Math.min(r1,g1,b1);
    //Calculate L:
    var L = (maxColor + minColor) / 2 ;
    var S = 0;
    var H = 0;
    if(maxColor != minColor){
        //Calculate S:
        if(L < 0.5){
            S = (maxColor - minColor) / (maxColor + minColor);
        }else{
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if(r1 == maxColor){
            H = (g1-b1) / (maxColor - minColor);
        }else if(g1 == maxColor){
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        }else{
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }
 
    L = L * 100;
    S = S * 100;
    H = H * 60;
    if(H<0){
        H += 360;
    }
    var result = [H, S, L];
    return result;
}

//Gather all the Hues from all the HTML elements in the window
function checkElementHue(){
    const elements = Array.from(document.body.querySelectorAll("*"));
    let hues = [];
    elements.forEach(elem =>{
      const fontColor =  window.getComputedStyle(elem, null).getPropertyValue("color");
      const bgColor =  window.getComputedStyle(elem, null).getPropertyValue("background-color");
      const borderColor = window.getComputedStyle(elem, null).getPropertyValue("border-color")

      if(fontColor || bgColor || borderColor){
          hues.push({
              element : elem,
              hue : {
                bgColor : colorToHsl(bgColor) ? colorToHsl(bgColor) : "fail" , //fail means the element did not have a color value
                borderColor : colorToHsl(borderColor) ? colorToHsl(borderColor) : "fail",
                fontColor : colorToHsl(borderColor) ? colorToHsl(borderColor) : "fail"
              }
          })
      }
      
    })
    return hues
  }

  module.exports = function colorFilterWarning(hueValueStart,hueValueEnd){
    const elementHueArray = checkElementHue() // An Array of all elements in the window
    console.log(elementHueArray)
    const testArray = []
    const warning = "This element might have a conflicting colour when brightness is low or in night mode";
    elementHueArray.forEach(elem=>{
      let obj = elem;

      if(obj.hue.bgColor && obj.hue.bgColor != "fail"){
          if(obj.hue.bgColor[0] < hueValueStart && obj.hue.bgColor[0] > hueValueEnd){
            obj.hue.bgColor = false
            console.log("ATTRIBUTE : background-color" , warning, elem.element)
          }
      }

       if(obj.hue.borderColor && obj.hue.borderColor != "fail"){
          if(obj.hue.borderColor[0] < hueValueStart && obj.hue.borderColor[0] > hueValueEnd){
            obj.hue.borderColor = false
            console.log("ATTRIBUTE : border-color" , warning, elem.element)
          }
      }

      if(obj.hue.fontColor && obj.hue.fontColor != "fail"){
          if(obj.hue.fontColor[0] < hueValueStart && obj.hue.fontColor[0] > hueValueEnd){
            obj.hue.fontColor = false
            console.log("ATTRIBUTE : border-color" , warning, elem.element)
          }
      }
      testArray.push(obj)
    })

    return testArray
  }