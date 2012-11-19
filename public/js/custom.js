$(function() {

	var i = 0;
	var paper = Raphael('draw', 30, 0, 3000, 3000);
	var c = paper.circle(50, 60, 30);
	c.attr({
		fill: 'red',
		cursor: 'pointer',
		opacity: 0.5,
		stroke: 'white'
	});	
	c.node.id = 'red_circle';
	
	var b = paper.circle(350, 60, 40);
	b.attr({
		fill: 'blue',
		opacity: 0.5,
		stroke: 'white'
	});
	
	var x = paper.circle(300, 100, 20);
	x.attr({
		fill: 'yellow',
		opacity: 0.5,
		stroke: 'white'
	});
	
	var t = paper.text(50, 10, "Raphaël");
	
	var s = $('#red_circle').click(function() {
		i += 1;
		if ((i % 2) == 1){
			b.animate({r: 10, fill: 'green'}, 1000, "backIn");
		}
		else{
			b.animate({r: 40, fill: 'blue'}, 5000, "elastic");
		}
	});	
	
});