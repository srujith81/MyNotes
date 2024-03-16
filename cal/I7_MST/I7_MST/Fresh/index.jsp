<%@ page import="java.io.*,java.sql.*" %>  
  
<%
    
 try
 {
    
	//Loading driver...
	Class.forName("oracle.jdbc.driver.OracleDriver");

	//creating connection...
	Connection con=DriverManager.getConnection("jdbc:oracle:thin:@rabiya_umar-pc:1521:XE","system","basha");
	PreparedStatement pst=con.prepareStatement("insert into res(Flying_from,Flying_to,depart_date,Return_Date,No_of_Adults,No_of_Children,Travel_class ) values(?,?,?,?,?,?,?)");
	String flf=request.getParameter("ff");
	String flt=request.getParameter("ft");
	String dda=request.getParameter("dd");
	String rda=request.getParameter("rd");
	String nad=request.getParameter("na");
  String nch=request.getParameter("nc");
  String tcl=request.getParameter("tc");
  pst.setString(1,flf);
  pst.setString(2,flt);
  pst.setString(3,dda);
    pst.setString(4,rda);
    pst.setString(5,nad);
    pst.setString(6,nch);
    pst.setString(7,tcl);
   
    ResultSet rs=pst.executeUpdate();
    con.close();
    %>
<jsp:include page="final.html"/>
<%
  }
catch(Exception e)
         {
%>
			<%=e%>
<%		}

%>  
