<html>
  <head>
    <title>BT</title>
  </head>
  <body bgcolor="lightgreen">
    <%@ page import="java.io.*,java.sql.*" %>  
  
<%
    
 try
 {
    
	//Loading driver...
	Class.forName("oracle.jdbc.driver.OracleDriver");

	//creating connection...
	Connection con = DriverManager.getConnection("jdbc:oracle:thin:@laptop-ftb4ntjs:1526:xe", "system", "Madhu123");
	PreparedStatement pst=con.prepareStatement("insert into res(FLYING_FORM,FLYING_TO,DEPART_DATE,RETURN_DATE,NO_OF_ADULTS,NO_OF_CHILDREN,TRAVEL_CLASS) values(?,?,?,?,?,?,?)");
	String flf=request.getParameter("ff");
	String flt=request.getParameter("ft");
	String dda=request.getParameter("dd");
	String rda=request.getParameter("rd");
	String nad=request.getParameter("na");
  String nch=request.getParameter("nc");
  String tcl=request.getParameter("tc");
  session.setAttribute("a",flf);
 session.setAttribute("b",flt);
 session.setAttribute("c",dda);
 session.setAttribute("d",rda);
 session.setAttribute("e",nad);
 session.setAttribute("f",nch);
 session.setAttribute("g",tcl);
  pst.setString(1,flf);
  pst.setString(2,flt);
  pst.setString(3,dda);
    pst.setString(4,rda);
    pst.setString(5,nad);
    pst.setString(6,nch);
    pst.setString(7,tcl);
   
    int rs=pst.executeUpdate();
    con.commit();
    con.close();
    %>
<jsp:include page="final.jsp"/>
<%
  }
catch(Exception e)
         {
%>
			<%=e%>
<%		}

%>  



  </body>
</html>