<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>HTML Site Template</title>
	
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/default.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/loading.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/ui-lightness/jquery-ui.css" />
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
	
    <script src="${pageContext.request.contextPath}/js/lib/raphael.js"></script>
    <script src="${pageContext.request.contextPath}/js/lib/scale_raphael.js"></script>
    
    <script src="${pageContext.request.contextPath}/js/main.js"></script>
    <script src="${pageContext.request.contextPath}/js/post.js"></script>
    <script src="${pageContext.request.contextPath}/js/calculate.js"></script>
    <script src="${pageContext.request.contextPath}/js/draw.js"></script>
    <script src="${pageContext.request.contextPath}/js/initialize.js"></script>
    <script src="${pageContext.request.contextPath}/js/inform.js"></script>
	</head>
<body>

<!-- start:Wrap -->
<div id="wrap">
<!-- start:Content -->


<div id="InformationSpreadingViz">
	<div id="breadcrumb-nav-container">
		<h4>Letzte angezeigte Posts:</h4>
	</div>
		
	<hr class="is-divider">
	
	<div id="infos">
		<div id="infoBox">
			<h4 style="margin-left: 20px;">Aktuell angezeiger Post:</h4>
			<div id="is-info-box">	
				<div id="is-info-box-bg">&nbsp;</div>
				<div id="is-info-box-img-div"><img id="is-info-box-img"></div>
				<div id="is-info-box-text-container">
					<h5 class="is-info-box-text" id="is-post-title"></h5>
					<h5 class="is-info-box-text" id="is-post-details"></h5>
				</div>
			</div>
		</div>
		
		<div id="color-key">
			<div id="key-entry">
				<div class="blue_circle"></div>
				<h5 id="entry-label">Blog Post</h5>
			</div>
			<div id="key-entry">
				<div class="green_circle"></div>
				<h5 id="entry-label">Twitter Post</h5>
			</div>			
			<div id="key-entry">
				<div class="red_circle"></div>
				<h5 id="entry-label">Facebook Post</h5>
			</div>
			<div id="key-entry">
				<div class="grey_circle"></div>
				<h5 id="entry-label">Newsportal Post</h5>
			</div>
		</div>
	</div>
	
	<div id="draw">
		<script> 
			init_paper();
		</script>
	</div>
</div>
<!-- end:Content -->


<!-- end:Wrap -->
</div>

<div id="loading">
<div id="loading-box">
<div id="loading-animation">
<div id="circle">
<div id="circle_1" class="circle"></div>
<div id="circle_2" class="circle"></div>
<div id="circle_3" class="circle"></div>
<div class="clearfix"></div>
</div>
</div>
<div id="loading-caption">
Loading...
</div>
</div>
</div>

<footer>
	<img src="${pageContext.request.contextPath}/graphics/Logo-white-background.png" width="368" alt="Logo">
</footer>
</body>
</html>