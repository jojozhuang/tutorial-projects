import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class TestRunner {
   public static void main(String[] args) {
      Result result = JUnitCore.runClasses(SolutionTest.class);

      System.out.printf("Test ran: %s, Failed: %s%n",
              result.getRunCount(), result.getFailureCount());
      
      for (Failure failure : result.getFailures()) {
         System.out.println(failure.toString());
      }
      
      // final result, pass or fail
      System.out.println("All test cases are passed? " + result.wasSuccessful());
   }
} 