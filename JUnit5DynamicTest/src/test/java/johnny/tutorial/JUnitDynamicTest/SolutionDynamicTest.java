package johnny.tutorial.JUnitDynamicTest;

import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.function.Executable;

public class SolutionDynamicTest {

    private Solution solution;

    @BeforeEach
    public void setUp() {
        solution = new Solution();
    }

    @TestFactory
    public Collection<DynamicTest> testTwoSum() {

        Collection<DynamicTest> dynamicTests = new ArrayList<>();

        try {
            BufferedReader br = new BufferedReader(new FileReader("testcase.txt"));
            try {
                String line;
                while ((line = br.readLine()) != null) {
                    int[] nums = ParserUtil.stringToIntegerArray(line);
                    line = br.readLine();
                    int target = Integer.parseInt(line);
                    line = br.readLine();
                    int[] expected = ParserUtil.stringToIntegerArray(line);
                    // create an test execution
                    int[] ret = solution.twoSum(nums, target);
                    Executable exec = () -> assertArrayEquals(expected, ret);

                    // create a test display name
                    String testCase = "Test Two Sum: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                    // create dynamic test
                    System.out.println(testCase);
                    DynamicTest dTest = DynamicTest.dynamicTest(testCase, exec);

                    // add the dynamic test to collection
                    dynamicTests.add(dTest);
                }
            }
            catch (Exception io) {
                System.out.println(io.getMessage());
            }
            finally {
                br.close();
            }
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        } finally {
        }

        return dynamicTests;
    }
}
