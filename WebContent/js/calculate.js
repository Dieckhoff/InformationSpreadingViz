function get_min_max_values(posts) {
	var max_importance = 0;
	var min_importance = parseFloat(posts[0].score);

	var max_date = 0;
	var min_date = parseInt(posts[0].pubDate);
		
	
	for (var i = 0; i < posts.length; ++i){		
		var post = posts[i];
		var score = parseFloat(post.score);
		var date = parseInt(post.pubDate);

		if (score > max_importance)
			max_importance = score;
		if (score < min_importance)
			min_importance = score;
		if ( (date > max_date) && (date > 0) )
			max_date = date;
		if ( (date < min_date) && (date > 0) )
			min_date = date;
	}
	
	var min_max_values = [];

	min_max_values.push(min_date);
	min_max_values.push(max_date);
	min_max_values.push(min_importance);
	min_max_values.push(max_importance);
	
	return min_max_values;
}

function normalize_size(max, min, score) {
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, middle, current_time) {
	var result = 30;
	if (current_time < middle)
		result = ( (current_time - min) * ((500 - 30) / (max - min)) + 30 );	// left side of the clicked post - from pixel 30 to pixel 500
	else if (current_time > middle)
		result = ( (current_time - min) * ((1000 - 500) / (max - min)) + 500 );	// right side of the clicked post - from pixel 500 to pixel 1000
	else
		result = 500;
	return result;
}

function get_selected_post() {
	var selected_post = null;
	for(var i = 0; i < global_post_array.length; i++) {
			if (global_post_array[i].isSelected == true) {
				selected_post = global_post_array[i];
			}
	}	
	return selected_post;
}