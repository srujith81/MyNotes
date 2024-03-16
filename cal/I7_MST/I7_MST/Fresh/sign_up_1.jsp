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
	PreparedStatement pst=con.prepareStatement("insert into sign(F_Name,L_Name,Age,Email,Mobile_Number ) values(?,?,?,?,?)");
	String sf=request.getParameter("fname");
	String sl=request.getParameter("lname");
	int sa=Integer.parseInt(request.getParameter("age"));
	String se=request.getParameter("email");
	int  sm=Integer.parseInt(request.getParameter("mob"));
	
    pst.setString(1,sf);
    pst.setString(2,sl);
    pst.setInt(3,sa);
    pst.setString(4,se);
    pst.setInt(5,sm);

    ResultSet rs=pst.executeUpdate();
	if (rs!=null)
	{
		out.println("Inserted...");
	}
 }
 catch (Exception e)
 {
	e.printStackTrace();
 }
%>