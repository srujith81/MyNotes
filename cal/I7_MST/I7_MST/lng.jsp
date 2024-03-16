<html>
    <head></head>
    <body bgcolor="cyan">
        <%@page import="java.sql.*,java.util.*,javax.servlet.*,javax.servlet.http.*"%>
<%
	String em = request.getParameter("fname");
	String pwd = request.getParameter("email");
	try
	{
		Class.forName("oracle.jdbc.driver.OracleDriver");
		Connection con = DriverManager.getConnection("jdbc:oracle:thin:@laptop-ftb4ntjs:1526:xe", "system", "Madhu123");
		String query = "SELECT * FROM sign WHERE F_NAME=? AND EMAIL=?";
		PreparedStatement ps = con.prepareStatement(query);
		ps.setString(1,em);
		ps.setString(2,pwd);
		ResultSet rs = ps.executeQuery();
		if(rs.next())
		{
		%>
			<jsp:include page="index.html" />
		<%	
		}
		else 
		{
		%>
			<h3 align="center" style="color:yellow;">Invalid Username or Password.So, Try to login again using Valid Password</h3>
			<jsp:include page="lgng.html" />
		<%
		}
		con.close();
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
%>

<%-- 
	if you/user try to create an object like "session" which is already provided by the JSP INBUILT so no need to create or declare if you create or declare the inbuilt object then you will get ->>> Duplicate local variable session in line[line_number]

	jsp has an inbuilt session variable that you can actually use. So since you are reusing it you are getting the duplicate error.

	This is the equivalent of doing Session session=request.getSession() in a servlet;
 --%>
    </body>
</html>