package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class conexion {
    static String URL = "jdbc:mysql://mysql.cx6ywqwc6n1s.us-east-1.rds.amazonaws.com:3306/users";
    static String USER = "admin";
    static String PASSWORD = "Polula3128";
    
    

    public static Connection getConnection() {
        Connection con=null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); 
            con = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Conexión exitosa");
        } catch (ClassNotFoundException e) {
            System.out.println("Error al cargar el driver de la base de datos: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos: " + e.getMessage());
        }
        return con;
        
    }

    public static void main(String[] args) {
        Connection con = conexion.getConnection();
        if (con != null) {
            try {
                con.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar la conexión: " + e.getMessage());
            }
        }
        
    }
}
