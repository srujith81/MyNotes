<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
    </title>
</head>
<body bgcolor="navyblue">
    <%@ page import="java.sql.*,java.util.*"%>
<%
String u = request.getParameter("username");
String p = request.getParameter("password");
int f1=0,f2=0;
    try
    {
            if (u.equals(p)&&u.equals("admin")&&p.equals("admin"))
            {
                Class.forName("oracle.jdbc.driver.OracleDriver");
                Connection con = DriverManager.getConnection("jdbc:oracle:thin:@laptop-ftb4ntjs:1526:xe", "system", "Madhu123");
                PreparedStatement ps = con.prepareStatement("select * from res");
                ResultSet rs = ps.executeQuery();
                PreparedStatement ps1 = con.prepareStatement("select * from sign");
                ResultSet rs1 = ps1.executeQuery();

                PreparedStatement cps1 = con.prepareStatement("select count(*) from res");
                ResultSet crs1 = cps1.executeQuery();
                PreparedStatement cps2 = con.prepareStatement("select count(*) from sign");
                ResultSet crs2 = cps2.executeQuery();
                %><table border="7pxpx" align="center" bgcolor="skyblue"><%
                    out.println("<h1><center>BOOKING DETAILS</center></h1>");%>
                    <tr>
                    <th>Flying from</th>
                    <th>Flying to</th>
                    <th>Departure date</th>
                    <th>Arrival date</th>
                    <th>No of Adults</th>
                    <th>No of Tickets</th>
                    <th>Class</th>
                    </tr><%
                        if (crs1.next())
                        {
                            out.println("<h1>Count of Bookings: "+crs1.getInt(1)+"</h1>");
                        }
                        while (rs.next())
                        {
                            f1 = f1+1;
                            %>
                                
                               <tr><td> <%= rs.getString(1) %></td> 
                                <td><%= rs.getString(2) %></td>
                                <td><%= rs.getString(3) %></td>
                                <td><%= rs.getString(4) %></td>
                                <td><%= rs.getString(5) %></td>
                                <td><%= rs.getString(6) %></td>
                                <td><%= rs.getString(7) %></td></tr>
                            <%
                        }
                        %></table><%
                    if (f1==0)
                    {
                        out.println("<h3 align='center'>No Bookings Done Yet...</h3>");
                    }
                    %>
                    <table border="7px" align="center" bgcolor="pink">
                    <tr  style="padding: 12px;">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Gmail </th>
                    <th>Password</th>
                    </tr><%

                    out.println("<h1><center>Members Registered Details</center></h1>");
                        if (crs2.next())
                        {
                            out.println("<h1>Count of Registrations: "+crs2.getInt(1)+"</h1>");
                        }
                        while (rs1.next())
                        {
                            f2 = f2+1;
                            %>
                                
                                <tr  style="padding: 12px;"><td><%= rs1.getString(1) %></td>
                                <td><%= rs1.getString(2) %></td>
                                <td><%= rs1.getString(3) %></td>
                                <td><%= rs1.getString(4) %></td>
                                <td><%= rs1.getString(5) %></td></tr>
                            <%
                        }
                        %></table><%
                    if (f2==0)
                    {
                        out.println("<h3 align='center'>No Registrations Done Yet...</h3>");
                    }
            }
            else 
            {
                %>
                        <h2 align="center" style="color: yellow; font-family: cursive;">Please Enter valid Admin Username and Password</h2>
                        <jsp:include page="ret_admin.html" />
                <%
            }
    }
    catch(Exception e)
    {
        out.println(e);
    }
%>
<button type="button"><a href="inde_1.html">Home</a></button>
</body>
</html>