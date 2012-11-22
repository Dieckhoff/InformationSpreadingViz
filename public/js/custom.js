$(function() {

	var i = 0;
	var paper = Raphael('draw', 30, 0, 0, 0);
	
	var line = paper.path("M100,60L320,60");
		line.attr({
			opacity: 0.4,
			stroke: "black"
		})
	
	var c = paper.circle(50, 60, 50);
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
	
	
	
	
	var hoverIn = function() {
        b.attr({"fill": "green"});
		line.attr({opacity: 1})
    };
	
	  var hoverOut = function() {
        b.attr({"fill": "grey"});  
		line.attr({opacity: 0.5})		
    }
	
	  c.hover(hoverIn, hoverOut, c, c);
	
});