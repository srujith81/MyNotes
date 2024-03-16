import java.sql.*;  
class OracleCon
{  
public static void main(String args[]){  
try{  
//step1 load the driver class  
Class.forName("oracle.jdbc.driver.OracleDriver");  
  
//step2 create  the connection object  
Connection con=DriverManager.getConnection(  
"jdbc:oracle:thin:@localhost:1521:XE","system","basha");  
  
//step3 create the statement object  
 if(con!=null)
 {
 System.out.println("Connected");
 }
 else
 {
 System.out.println("Not connected"); } 
  
//step4 execute query  
  
//step5 close the connection object  
con.close();  
  
}catch(Exception e){ System.out.println(e);}  
  
}  
}  