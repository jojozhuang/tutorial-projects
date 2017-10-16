import java.io.*;
import java.net.*;

class TCPClient {
    public static void main(String args[]) throws Exception {
        String serverName = "localhost";
        int port = 8722; // Same port number with the server
        Socket socket = null;
        PrintStream toServer = null;
        BufferedReader fromServer = null;

        System.out.println("TCP Client launched, using server: " + serverName + ", Port: " + port);

        // Read from user input
        BufferedReader inFromUser = new BufferedReader(new InputStreamReader(System.in));
        String userInput = "";
        do {
            System.out.print("Enter any string now, (quit) to end: ");
            System.out.flush();
            userInput = inFromUser.readLine();
            if (userInput.equalsIgnoreCase("quit")) {
                break;
            }

            // Open a new socket connection to the server with the specified port number
            socket = new Socket(serverName, port);

            // Send user input to server
            toServer = new PrintStream(socket.getOutputStream());
            toServer.println(userInput);
            System.out.println("[TCPClient] Send out user input [" + userInput + "] to Server.");

            // Get response from server
            fromServer = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String responseFromServer = fromServer.readLine();
            System.out.println("[TCPClient] Get response [" + responseFromServer + "] from Server.");
        } while (!userInput.equals("quit")); // End the client if 'quit' is an input

        // Close connection
        if (socket != null) {
            socket.close();
        }
    }
}
