function initialize_posts(initial_post_id){
	draw_timeline();
	$("#loading").show();
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){		
			$("#loading").hide();
			var posts = result.posts;
			var visitedPosts = result.visitedPosts; 
			initialize_post_callback(posts, visitedPosts);
		}.bind(this)
	);
};

function initialize_post_callback(posts, visitedPosts){
	initialize_nav_bar(visitedPosts);
	
	arr = new Array();
	
	var initial_post = posts[0];	
	var min_max_values = get_min_max_values(posts);
	
	var min_date		= min_max_values[0];
	var max_date		= min_max_values[1];
	var min_importance	= min_max_values[2];
	var max_importance	= min_max_values[3];
	
	for (var i = 0; i < posts.length; ++i) {	// drawing all the mentioned posts (including the initial (clicked) post
		var post = new Post(posts[i].id);

		post.paper = my_paper;
		post.title = posts[i].title;
		post.type = posts[i].type;
		post.url = posts[i].url;
		post.blog = posts[i].blog;
		post.image_source = posts[i].image;

		post.importance = parseFloat(posts[i].score);
		post.size = normalize_size(max_importance, min_importance, post.importance);

		post.time = new Date(parseInt(posts[i].pubDate));
		middle_date = parseInt(initial_post.pubDate);

		post.x = normalize_position(max_date, min_date, middle_date, parseInt(posts[i].pubDate));

		if (post.type == 'Facebook'){
			post.color = 'forestgreen';
		}
		else if (post.type == 'Twitter'){
			post.color = 'firebrick';
		}
		else if (post.type == 'Newsportal'){
			post.color = 'darkgray';
		}
		else if (post.type == 'Blog'){
			post.color = 'steelblue';
		}
		else{
			post.color = 'steelblue';
		}
		
		var img = new Image();
		img.src = post.image_source;

		post.imgwidth = img.width;
		post.imgheight = img.height;

		post.label = post.draw_label();
		post.label.hide();
		post.preview_image = post.show_preview();
		post.preview_image.hide();
		post.circle = post.draw_circle();

		post.to = initial_post.incomingLinks;
		post.from = initial_post.outgoingLinks;

		arr.push(post);
	};
	
	draw_timeline_labels(max_date, min_date, middle_date);
	timeline.toBack();
	
	var clicked = arr[0];
	
	console.log(clicked.circle);	
	
	clicked.circle.toFront();
	
	clicked.to = initial_post.incomingLinks;
	clicked.from = initial_post.outgoingLinks;
	
	clicked.links = clicked.draw_links();
	
	clear_marking();
	
	clicked.circle.g = clicked.circle.glow({
		width: 90,
		fill: true,
		color: 'orange',
	});
	
	initialize_functions();
	populate_info_box(clicked);
	clicked.isSelected = true;
}

function initialize_nav_bar(visitedPosts) {
	navBarElements = new Array();
	
	for (var i = 0; i < visitedPosts.length; ++i) {	
		var navbarelement = new nav_element(visitedPosts[i].id);
		navbarelement.title = visitedPosts[i].title;	
		navBarElements.push(navbarelement);
	}
		
	var html = '<ul class="breadcrumb">';
	for (var i = 0; i < navBarElements.length; i++) {
	    html += ' <li id=' + navBarElements[i].Uuid + ' class="navelement"><span class="divider">/</span><a href="#">' + navBarElements[i].title + '</a></li>';
	}
	html += '</ul>';
	
	$('.breadcrumb').remove();
	$('#breadcrumb-nav-container').append(html);		
}

function initialize_functions(){
	for(var i = 0; i < arr.length; i++) {
		var post = arr[i];
		(function(post) {
			post.circle.mouseover(function() {
				if(post.isSelected == false) {
					post.label.show();
					post.preview_image.show();
				}
			}).mouseout(function () {
//				if(post.isSelected == false) {
					post.label.hide();
					post.preview_image.hide();
//				}

			});
			post.circle.dblclick(function() {
				populate_info_box(post);
				
				var pos_x	= parseInt(this.attr('cx'));
				var radius	= parseInt(this.attr('r'));
				var color	= this.attr('fill');
				console.log(color);
				
				clearAll();
				draw_timeline();
				
				loading_circle = my_paper.circle(pos_x, 225, radius);
				loading_circle.attr({
					stroke: .0,
					fill: color,
				});
				loading_circle.animate({cx: 500, cy: 225}, 1000);
				console.log(loading_circle.attr('cx'));
				
				initialize_posts(post.Uuid);
			});
			post.circle.click(function() {
				post.label.hide();
				post.preview_image.hide();
				clear_marking();
				post.isSelected = true;
				populate_info_box(post);
				if (arr[0].circle.yellow_glow == null) {
					arr[0].circle.yellow_glow = arr[0].circle.glow({
						width: 90,
						fill: true,
						color: 'yellow',
					});
				}
//				current_selected_post = get_selected_post();
//				if(current_selected_post == null) {
//					post.label.show();
//					post.preview_image.show();
//					post.isSelected = true;
//				}
//				else {
//					current_selected_post.label.hide();
//					current_selected_post.preview_image.hide();
//					current_selected_post.isSelected = false;	
//				}

				this.g = this.glow({
					color: 'orange',
					width: 90,
				});
			});
		})(post);
	};
	$(".navelement").click(function(event) {
		clearAll();
		draw_timeline();
		initialize_posts($(this).attr('id'));
		});
}