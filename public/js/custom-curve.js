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
	p.animate({path:"M"+cx+" "+cy+"C200,20 300,20 "+bx+" ,"+by}, 300, "easeIn")

	p.attr({'arrow-end': 'classic-wide-long'});
 //cx,cy Startpunkt; C200,30 erster Kontrollpkt, 300,30 2. Kontrollunkt. 350,60 Zielpunkt

	 var x = paper.circle(350, 150, 20);
		x.attr({
			fill: 'steelblue',
			cursor: 'pointer',
			opacity: 0.5,
			stroke: 'white'
		});	
		x.node.id = 'red_circle';
		
		var y = paper.circle(450, 150, 30);
		y.attr({
			fill: 'grey',
			opacity: 0.5,
			stroke: 'white'
		});


		var a = y.attr("cx") - x.attr("cx");

		var xx=x.attr('cx') + a * 0.25 ;
		var xy=x.attr('cy') + a * 0.2;

		var yx=y.attr('cx') - a *0.25;
		var yy=y.attr('cy') + a *0.2;


		var xp = paper.path ("M"+y.attr("cx")+" "+y.attr("cy")+"C"+yx+","+yy+" "+xx+","+xy+" "+x.attr('cx')+" "+x.attr('cy'));
		//xp.animate({path:"M"+y.attr("cx")+" "+y.attr("cy")+"C425,170 375,170 "+x.attr('cx')+" "+x.attr('cy')},300)
		xp.attr({'arrow-end': 'classic-wide-long'});
	
	
	
	
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
	  
	 //  var s = c.click(function() {
		// i += 1;
		// if ((i % 2) == 1){
		// b.animate({r: 10, fill: 'green'}, 1000, "backIn")	
		// }
		// else{
		// b.animate({r: 40, fill: 'blue'}, 5000, "elastic");
		// }
		// });
	
});

/* ALGORITHMUS: Ausgangslage Mittelpunkte der Kreise M1 und M2 und deren x Abstand A
				Bezierkurve braucht 2 Kontrollpunkte.  
					1. Kontrollpunkt P1: (M1.x - A * 1/4 , M1.y + A * 1/5)
					2. Kontrollpunkt P2: (M2.x + A * 1/4 , M2.y + A * 1/5)

			Raphael path wird dann wie folgt angegeben: 
				"M M1,M2 CP1.x,P1.y P2.x,P2.y M2.x,M2.y"  // M gibt Anfangspunkt an, C steht für Curve mittels 2 Kontrollpunkten und Endpunkt
*/
