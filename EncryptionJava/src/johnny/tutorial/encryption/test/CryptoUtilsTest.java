package johnny.tutorial.encryption.test;

import static org.junit.Assert.*;

import java.io.File;

import org.junit.Test;

import johnny.tutorial.encryption.CryptoException;
import johnny.tutorial.encryption.CryptoUtils;

public class CryptoUtilsTest {

	@Test
	public void test() {
		String key = "Mary has one cat1";
		//String key = "0lpz4SKt+qdsMvFyLRmjZA==";
        File inputFile = new File("document.txt");
        File encryptedFile = new File("encrypted.txt");
        File decryptedFile = new File("decrypted.txt");
         
        try {
            CryptoUtils.encrypt(key, inputFile, encryptedFile);
            CryptoUtils.decrypt(key, encryptedFile, decryptedFile);
        } catch (CryptoException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
	}

}
