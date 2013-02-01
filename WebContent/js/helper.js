//	{
//	    "posts": [
//	        {
//	            "id": "de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012",
//	            "title": "Google Transparency Report: Staatliche �?berwachung im Netz nimmt weltweit zu",
//	            "blog": "http://www.zeit.de",
//	            "content": "Petraeus ist nur einer von Tausenden, die vom Staat ausgespäht werden. Google berichtet: Nie wurde der Konzern aufgefordert, so viele Nutzerdaten auszuhändigen wie heute.",
//	            "image": "http://images.zeit.de/digital/datenschutz/2012-11/general-david-petraeus/general-david-petraeus-148x84.jpg",
//	            "url": "http://www.zeit.de/digital/datenschutz/2012-11/google-transparency-report-2012",
//	            "author": "",
//	            "pubDate": "Nov 14, 2012 1:17:15 PM",
//	            "score": 3.8472834e-9,
//	            "outgoingLinks": [
//	                "de.zeit.www:http/digital/datenschutz/2012-11/ccc-kritik-antiterrordatei",
//	                "de.zeit.zeitreisen:http/",
//	                "de.zeit.www:http/karriere/beruf/index",
//	            ],
//	            "incomingLinks": [
//	                "de.zeit.www:http/digital/datenschutz/index",
//	                "de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012"
//	            ]
//	        },
//	       { ... Hier folgen die weiteren anzuzeigenden Posts. ... }
//	    ]
//	}

function initialize_posts(initial_post_id){

	$("#loading").show();
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){
		
		$("#loading").hide();
		var posts = result.posts;
			initialize_post_callback(posts)
		}.bind(this)
	);
	
};

function initialize_post_callback(posts){
	
	var initial_post = posts[0];
	var min_max_values = get_min_max_values(posts);
	
	var min_date		= min_max_values[0];
	var max_date		= min_max_values[1];
	var min_importance	= min_max_values[2];
	var max_importance	= min_max_values[3];
	
	for (var i = 0; i < posts.length; ++i) {	// drawing all the mentioned posts (including the initial (clicked) post
		var post = new Post(posts[i].id);

		post.paper = paper;
		post.title = posts[i].title;
		post.type = posts[i].type;
		post.url = posts[i].url;
		post.blog = posts[i].blog;
		post.image_source = posts[i].image;

		post.importance = parseFloat(posts[i].score);
		post.size = normalize_size(max_importance, min_importance, post.importance);

		post.time = new Date(parseInt(posts[i].pubDate));

		post.x = normalize_position(max_date, min_date, parseInt(posts[i].pubDate));

		post.y = 200;

		if (post.type == 'Facebook'){
			post.color = 'steelblue';
		}
		else if (post.type == 'Twitter'){
			post.color = 'purple';
		}
		else if (post.type == 'News'){
			post.color = 'orange';
		}
		else{
			post.color = 'grey';
		}

		post.label = post.draw_label();
		post.label.hide();
		post.preview_image = post.show_preview();
		post.preview_image.hide();
		post.circle = post.draw_circle();

		post.to = initial_post.incomingLinks;
		post.from = initial_post.outgoingLinks;

		arr.push(post);
	};
	
	var clicked = arr[0];
	
	clicked.to = initial_post.incomingLinks;
	clicked.from = initial_post.outgoingLinks;
	
	clicked.links = clicked.draw_links();
	
	initialize_functions(arr);
}

function initialize_functions(arr){
	for(var i = 0; i < arr.length; i++) {
		var post = arr[i];
		(function(post) {
			post.circle.mouseover(
				function () {
					this.animate({"opacity": .8}, 200);
					post.label.show();
					post.preview_image.show();
				}).mouseout(function () {
					this.animate({"opacity": .5}, 200);
					post.label.hide();
					post.preview_image.hide();
				}
			);
			post.circle.click(function(){
				clearAll();
//				post.links = post.draw_links();
//				$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + post.Uuid,
//					function(result){
//						$.each(result, function(i, field){
//						console.log(this[0]);
//				    });
//				});
				initialize_posts(post.Uuid);
			});
		})(post);
	};
}

function get_min_max_values(posts){

	var max_importance = 0;
	var min_importance = parseFloat(posts[0].score);

	var max_date = 0;
	var min_date = parseInt(posts[0].pubDate);
		
	
	for (var i = 0; i < posts.length; ++i){		
		post = posts[i];

		if (parseFloat(post.score) > max_importance)
			max_importance = parseFloat(post.score);
		if (parseFloat(post.score) < min_importance)
			min_importance = parseFloat(post.score);
		if (parseInt(post.pubDate) > max_date)
			max_date = parseInt(post.pubDate);
		if (parseInt(post.pubDate) < min_date)
			min_date = parseInt(post.pubDate);
	}
	
	var min_max_values = [];

	min_max_values.push(min_date);
	min_max_values.push(max_date);
	min_max_values.push(min_importance);
	min_max_values.push(max_importance);
	
	return min_max_values;
}

function normalize_size(max, min, score){
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, time){
	var result = ( (time - min) * ((1000 - 30) / (max - min)) + 30 );
	return parseInt(result);
}

function calculate_position(max_pos_diff, min_pos_diff, current_pos){
	if ((max_pos_diff < 20) && (max_pos_diff > 300)){
	}
	else return current_pos;
}

function clearAll(){
	for(var i = 0; i < arr.length; i++) {
		delete arr[i].circle;
		delete arr[i].links;
//		arr[i].circle.attr({"stroke-width": 0, "stroke": 'red'});
//		if (arr[i].links != undefined)
//			arr[i].links.hide();
	}
}