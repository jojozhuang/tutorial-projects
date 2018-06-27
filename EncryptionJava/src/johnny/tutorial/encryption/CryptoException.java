// CryptoException.java
package johnny.tutorial.encryption;

public class CryptoException extends Exception {
    public CryptoException() {
    }
 
    public CryptoException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
