<%@ page import="java.io.*,java.sql.*" %> 
<%
String source=(String) session.getAttribute("a");
String dest=(String) session.getAttribute("b");
String adults=(String) session.getAttribute("c");
String child=(String) session.getAttribute("d");
String dep=(String) session.getAttribute("e");
String tkt=(String) session.getAttribute("f");
String cls=(String) session.getAttribute("g");

%>
<!DOCTYPE html>
<html>
<head>
  <title>Aeroplane Reservation System - Tickets</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: grey;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      padding: 20px;
    }

    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      padding: auto;;
    }

    th {
      background-color: #c11010;
    }
  </style>
</head>
<body>
  <h1>Aeroplane Reservation System - Tickets</h1>
  <table>
    <thead>
      <tr>
        <th>Source</th>
        <th>Destination</th>
        <th>Departure Date</th>
        <th>Arrival Date</th>
        <th>Adults</th>
        <th>Children</th>
        <th>Class</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <tr>
        <td><%out.print(source);%></td>
        <td><%out.print(dest);%></td>
        <td><%out.print(adults);%></td>
        <td><%out.print(child);%></td>
        <td><%out.print(dep);%></td>
        <td><%out.print(tkt);%></td>
        <td><%out.print(cls);%></td>
      </tr>
      <!-- Add more ticket rows here -->

    </tbody>
  </table>
  <%
  int c=Integer.parseInt(dep);
  int a=Integer.parseInt(tkt);
  int res;
  res=a*4500+c*3000;
  %>
  <h1>
     Tickets price is:<% out.print(res);%>
  <%
  
  %>
</body>
</html>
