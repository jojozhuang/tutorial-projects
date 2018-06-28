package johnny.tutorial.JUnitDynamicTest;
import static org.junit.Assert.*;

import org.junit.Test;

public class SolutionTest {

    Solution solution = new Solution();

    @Test
    public void testInvalidInput() {
        System.out.println("testInvalidInput");

        assertArrayEquals(new int[2], solution.twoSum(null, 0));
        assertArrayEquals(new int[2], solution.twoSum(new int[] {}, 0));
    }

    @Test
    public void testSmallInput() {
        System.out.println("testSmallInput");

        assertArrayEquals(new int[] {1, 2}, solution.twoSum(new int[] { 1, 0, -1 }, -1));
        assertArrayEquals(new int[] {8, 9}, solution.twoSum(new int[]{1,2,3,4,5,6,7,8,9,10}, 19));
    }

    @Test
    public void testLargeInput() {
        System.out.println("testLargeInput");

        int[] numbers3 = {230,863,916,585,981,404,316,785,88,12,70,435,384,778,887,755,740,337,86,92,325,422,815,650,920,125,277,336,221,847,168,23,677,61,400,136,874,363,394,199,863,997,794,587,124,321,212,957,764,173,314,422,927,783,930,282,306,506,44,926,691,568,68,730,933,737,531,180,414,751,28,546,60,371,493,370,527,387,43,541,13,457,328,227,652,365,430,803,59,858,538,427,583,368,375,173,809,896,370,789};
        assertArrayEquals(new int[]{28, 45}, solution.twoSum(numbers3, 542));
    }
}
