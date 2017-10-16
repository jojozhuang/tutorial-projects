import java.io.*;
import java.net.*;

class TCPServer {
    public static void main(String args[]) throws Exception {
        int port = 8722;
        Socket socket = null;
        BufferedReader reader = null; // Local reader from the client
        PrintStream outputStream = null; // Output stream to the client

        String clientRequest = "";
        String responseToClient = "";
        ServerSocket ss = new ServerSocket(port);
        System.out.println("TCP Server is starting up, listening at port " + port + ".");

        while (true) {
            // Get request from client
            socket = ss.accept();
            reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            clientRequest = reader.readLine();
            System.out.println("[TCPServer] Get request [" + clientRequest + "] from Client.");

            // Send response to client
            outputStream = new PrintStream(socket.getOutputStream());
            responseToClient = clientRequest.toUpperCase();
            outputStream.println(responseToClient);
            System.out.println("[TCPServer] Send out response [" + responseToClient + "] to Client.");
        }
    }
}
