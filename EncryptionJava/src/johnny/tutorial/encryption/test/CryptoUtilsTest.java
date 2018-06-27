// CryptoUtilsTest.java
package johnny.tutorial.encryption.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.junit.Test;

import johnny.tutorial.encryption.CryptoException;
import johnny.tutorial.encryption.CryptoUtils;
import org.junit.Assert;

public class CryptoUtilsTest {
    private static final String ORIGINAL_FILE = "document.txt";
    private static final String ENCRYPTED_FILE = "encrypted.txt";
    private static final String DECRYPTED_FILE = "decrypted.txt";
    private static final String KEY_16 = "Mary has one cat";
    private static final String KEY_17 = "Water is purified";
    
    @Test
    public void test() {
        // Take a look the original content
        String original = readFile(ORIGINAL_FILE);
        System.out.print("Original content: ");
        System.out.println(original);

        File inputFile = new File(ORIGINAL_FILE);
        File encryptedFile = new File(ENCRYPTED_FILE);
        File decryptedFile = new File(DECRYPTED_FILE);

        try {
            CryptoUtils.encrypt(KEY_16, inputFile, encryptedFile);
            CryptoUtils.decrypt(KEY_16, encryptedFile, decryptedFile);
        } catch (CryptoException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }

        // Take a look the encrypted content 
        String encrypted = readFile(ENCRYPTED_FILE);
        System.out.print("Encrypted content: ");
        System.out.println(encrypted);

        // Take a look the decrypted content 
        String decrypted = readFile(DECRYPTED_FILE);
        System.out.print("Decrypted content: ");
        System.out.println(decrypted);
        
        Assert.assertEquals(original, decrypted);
    }
    
    /*
     * Read content from the given file
     */
    private String readFile(String filename) {
        String content = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            try {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {
                    sb.append(line);
                    sb.append(System.lineSeparator());
                    line = br.readLine();
                }
                content = sb.toString();
            }
            finally {
                br.close();
            }
       } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
       } finally {
       }
       return content;
    }

}
