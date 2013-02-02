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
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ui-lightness/jquery-ui.css" />
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/raphael.js"></script>
    <script src="${pageContext.request.contextPath}/js/post.js"></script>
    <script src="${pageContext.request.contextPath}/js/custom.js"></script>
    <script src="${pageContext.request.contextPath}/js/plug_arrows.js"></script>
    <script src="${pageContext.request.contextPath}/js/detect_zoom.js"></script>
    <script src="${pageContext.request.contextPath}/js/helper.js"></script>
    <script src="${pageContext.request.contextPath}/js/draw_helper.js"></script>
    <script src="${pageContext.request.contextPath}/js/initialize.js"></script>
    <script src="${pageContext.request.contextPath}/js/scale_raphael.js"></script>
    <script src="${pageContext.request.contextPath}/js/info_box.js"></script>
	</head>
<body>


<header id="header">
</header>
<div id="info-container">
    <ul class="breadcrumb">
    <li><a href="#">Vorletzter Post</a> <span class="divider">/</span></li>
    <li><a href="#">Letzter Post</a> <span class="divider">/</span></li>
    <li class="active">Aktueller Post</li>
    </ul>
</div>

<div id="is-info-box">
	<div id="is-info-box-bg">&nbsp;</div>
	<div id="is-info-box-img-div"><img id="is-info-box-img"></div>
	<div id="is-info-box-text-container">
	<h5 class="is-info-box-text" id="is-post-title"></h5>
	<h5 class="is-info-box-text"id="is-post-details-line1"></h5>
	<h5 class="is-info-box-text" id="is-post-details-line2"></h5>
	</div>
</div>


		    
<!-- start:Wrap -->
<div id="wrap">
<!-- start:Content -->
	<div id="InformationSpreadingViz">
		<div id="draw"></div>
	</div>
<!-- end:Content -->
</div>
<!-- end:Wrap -->

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