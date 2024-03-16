
<%@ page import="java.sql.*"%>  

<%
    
    String semail=request.getParameter("fname"); 
    String spwd=request.getParameter("email");

 try
 {
    
	//Loading driver...
	Class.forName("oracle.jdbc.driver.OracleDriver");

	//creating connection...
	Connection con = DriverManager.getConnection("jdbc:oracle:thin:@laptop-ftb4ntjs:1526:xe", "system", "Madhu123");
	/*
                    PreparedStatement vl = con.prepareStatement("select * from sign where F_NAME=? AND EMAIL=?");
                    vl.setString(1,"semail");
                    vl.setString(2,"spwd");
                    ResultSet search = vl.executeQuery();
                    if (search!=null)
                    {
                        %>
                            <jsp:include page="index.html" />
                        <%
                    }
                    else
                    {
                        %>
                            <script>
                                alert("Please Enter valid Username and MailID");
                            </script>
                        <%
                    }
    */
    String query = "SELECT * FROM sign WHERE USERNAME=? AND EMAIL=?";
		PreparedStatement ps = con.prepareStatement(query);
		ps.setString(1,semail);
		ps.setString(2,spwd);
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