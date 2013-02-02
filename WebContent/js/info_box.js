function populate_info_box(post){
	
	var type_string;
	if (post.type != null) type_string = post.type;
	else type_string = "Beitrag";
	
	var date = new Date(post.time);
	
	$("#is-post-title").html(post.title);
	$("#is-post-details-line1").html(type_string + " vom " + date.getDay() + "." + date.getMonth() + "." + date.getFullYear());
	$("#is-post-details-line2").html("veröffentlicht auf " + post.blog );
	
	$("#is-info-box-img").attr("src", post.image_source); 
	
}

