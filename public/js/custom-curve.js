$(function() {

	var i = 0;
	var paper = Raphael('draw', 30, 0, 0, 0);
	
	/*var line = paper.path("M100,60L320,60");
		line.attr({
			opacity: 0.4,
			stroke: "black"
		})
	*/
	
	var c = paper.circle(150, 60, 50);
	c.attr({
		fill: 'steelblue',
		cursor: 'pointer',
		opacity: 0.5,
		stroke: 'white'
	});	
	c.node.id = 'red_circle';
	
	var b = paper.circle(350, 60, 30);
	b.attr({
		fill: 'grey',
		opacity: 0.5,
		stroke: 'white'
	});
	
	console.log(b.attr('cx'));
	
	var cx = c.attr('cx')
	var cy = c.attr('cy')
	
	var bx = b.attr('cx')
	var by = b.attr('cy')
	//var p = paper.path("M"+cx+" "+cy+"L"+bx+" "+by "C10,20 ");
	var p = paper.path("M"+cx+" "+cy);
	p.animate({path:"M"+cx+" "+cy+"C200,30 300,30 "+bx+" ,"+by}, 300, "easeIn")

	p.attr({'arrow-end': 'classic-wide-long'});
 //cx,cy Startpunkt; C200,30 erster Kontrollpkt, 300,30 2. Kontrollunkt. 350,60 Zielpunkt
	
	
	
	
	/*var hoverIn = function() {
        b.attr({"fill": "green"});
		line.attr({opacity: 1})
    };
	
	  var hoverOut = function() {
        b.attr({"fill": "grey"});  
		line.attr({opacity: 0.5})		
    }
	
	  c.hover(hoverIn, hoverOut, c, c);
	 */
	  
	  var s = c.click(function() {
		i += 1;
		if ((i % 2) == 1){
		b.animate({r: 10, fill: 'green'}, 1000, "backIn")	
		}
		else{
		b.animate({r: 40, fill: 'blue'}, 5000, "elastic");
		}
		});
	
});
