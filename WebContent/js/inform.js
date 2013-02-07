function populate_info_box(post){	
	var type_string;
	if (post.type != null) type_string = post.type;
	else type_string = "Beitrag";
	
	var date = new Date(post.time);
	
	$("#is-post-title").html(post.title);
	
	var content = type_string + " vom " + date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + "<br/>" + 
				"veröffentlicht auf " + post.blog + "<br/>" + 
				"<a href=\"" + post.url + "\" target=\"_blank\">" + type_string + " lesen ... </a>";
	
	$("#is-post-details").html(content);
	
	$("#is-info-box-img").attr("src", post.image_source);	
}

function nav_element(id){
	this.Uuid = id;
	this.title;	
}