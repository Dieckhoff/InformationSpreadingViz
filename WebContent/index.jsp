<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>HTML Site Template</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/default.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ui-lightness/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/spinner.css" />
    
    

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/raphael.js"></script>
    <script src="${pageContext.request.contextPath}/js/post.js"></script>
    <script src="${pageContext.request.contextPath}/js/custom.js"></script>
    <script src="${pageContext.request.contextPath}/js/plug_arrows.js"></script>
    <script src="${pageContext.request.contextPath}/js/detect_zoom.js"></script>
    <script src="${pageContext.request.contextPath}/js/helper.js"></script>
    <script src="${pageContext.request.contextPath}/js/spinner.js"></script>
    
	</head>
<body>


<header id="header">
<img src="${pageContext.request.contextPath}/graphics/Logo-white-background.png" width="368" alt="Logo">
</header>
<!-- start:Wrap -->
<div id="wrap">
<!-- start:Content -->
		<div id="holder" style= "width:"100%></div>

	<div id="content">
	
		<div id="draw"></div>
	</div>
<!-- end:Content -->
</div>
<!-- end:Wrap -->
</body>
</html>