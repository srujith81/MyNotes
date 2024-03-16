<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv='X-UA-Compatible' content='IE=edge'>
	<title>Page Title</title>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<link rel='stylesheet' type='text/css' media='screen' href='main.css'>
	<script src='main.js'></script>
</head>
<body bgcolor="yellow">
	<%@ page import="java.io.*,java.sql.*" %>  
  
<%
    
    String semail=request.getParameter("username"); 
    String spwd=request.getParameter("password");
 try
 {
    
	//Loading driver...
	Class.forName("oracle.jdbc.driver.OracleDriver");

	//creating connection...
	Connection con = DriverManager.getConnection("jdbc:oracle:thin:@laptop-ftb4ntjs:1526:xe", "system", "Madhu123");
	PreparedStatement pst=con.prepareStatement("insert into sign(F_NAME,L_NAME,AGE,EMAIL,MOBILE_NUMBER ) values(?,?,?,?,?)");
	String sf=request.getParameter("fname");
	String sl=request.getParameter("lname");
	int sa=Integer.parseInt(request.getParameter("age"));
	String se=request.getParameter("email");
	int sm=Integer.parseInt(request.getParameter("mob"));
    pst.setString(1,sf);
    pst.setString(2,sl);
    pst.setInt(3,sa);
    pst.setString(4,se);
    pst.setInt(5,sm);
    ResultSet rs=pst.executeQuery();
	if (rs!=null)
	{
		%>
		<jsp:include page="index.html" />
		<%
	}
 }
 catch(Exception e)
 {
	e.printStackTrace();
 }
%>
</body>
</html>