;(function(){
	
var init = function(){

  // Inject the Div
  setupBox();
	
  last = 0;

  // Gather elements to update //&nearr;
  label = document.getElementById('letDenBox-label');
  arrow = document.getElementById('letDenBox-arrow');
  box = document.getElementById('letDenBox');
	
  series = new TimeSeries();
	
  
  // Fill the Div
  fillVars();

  // Update the Div
  setInterval( fillVars, 3000 );
chart = new SmoothieChart({maxValueScale:1,minValueScale:1,millisPerPixel:500,grid:{millisPerLine:5000,verticalSections:5,strokeStyle:'rgba(119,119,119,0.61)'},labels:{disabled:true}});
chart.addTimeSeries(series, {lineWidth:3,strokeStyle:'#52c0f5',fillStyle:'rgba(30,97,147,0.49)'});
chart.streamTo(document.getElementById('chart'), 3000);
	
}

var fillVars = function(){
  var sumDenaro = 0, sumLettera = 0, sumTot = 0;
  var denaro = document.querySelectorAll('td:nth-child(3)')
  var lettera = document.querySelectorAll('td:nth-child(6)')
	for (var i = 0; i < denaro.length; i++) {
		//console.log(parseInt(denaro[i].innerText.replace('.','')),parseInt(lettera[i].innerText.replace('.','')));
		sumDenaro += isNaN(parseInt(denaro[i].innerText.replace('.',''))) ? 0 : parseInt(denaro[i].innerText.replace('.',''));
		sumLettera += isNaN(parseInt(lettera[i].innerText.replace('.',''))) ? 0 : parseInt(lettera[i].innerText.replace('.',''));
	}
  sumTot = sumLettera-sumDenaro;	
  label.innerHTML = sumTot.toLocaleString();
  if(sumTot > 0){
	box.style.color = '#00ff00';
  }else{
	box.style.color = '#ee3333';
  }
  if(last == sumTot){
  	arrow.innerText = ''
  }else{
  	if(last < sumTot){
		arrow.innerHTML = "&nearr;"	  
	  }else{
		arrow.innerHTML = "&searr;"
	  }
  }
  last = sumTot;
	series.append(new Date().getTime(), last/1000);
}

var setupBox = function(){

  if ( !document.getElementById('letDenBox') ) {
    var newDiv = document.createElement('div');
    var newContent = '<div id=letDenBox-label></div><div id=letDenBox-arrow></div><div><canvas id="chart" width="400" height="100"></canvas></div>';
    newContent += '';
    newDiv.setAttribute('id', 'letDenBox');
    newDiv.style.position = 'fixed';
    newDiv.style.bottom = '0';
    //newDiv.style.right = '0';
    newDiv.style.backgroundColor = 'rgba(58, 58, 58, 0.4)';
    newDiv.style.padding = '.3em .3em';
    newDiv.style.color = '#00CC00';
    newDiv.style.fontFamily = 'monospace';
    //newDiv.style.setProperty('text-shadow','1px 1px #fff, -1px 1px #fff, 1px -1px #fff, -1px -1px #fff')
    newDiv.style.transition = "all 1s";	  
    newDiv.style.fontSize = '3em';
    newDiv.style.zIndex = '9999';
    newDiv.style.opacity = '1';
    newDiv.innerHTML = newContent;
    document.body.appendChild(newDiv);
	  
    document.getElementById('letDenBox-label').style.setProperty('text-shadow','1px 1px #fff, -1px 1px #fff, 1px -1px #fff, -1px -1px #fff');
    document.getElementById('letDenBox-label').style.display = 'inline';
    document.getElementById('letDenBox-arrow').style.display = 'inline';
    document.getElementById('letDenBox-arrow').style.paddingLeft = '.8em';	  
    document.getElementById('letDenBox-arrow').style.color = '#fff';
	  
  }
  document.getElementById('letDenBox').onmouseover = function() {
    this.style.opacity = '0';
  }
  document.getElementById('letDenBox').onmouseleave = function() {
    this.style.opacity = '1';
  }

};

setTimeout(init,3000);


})(window);
