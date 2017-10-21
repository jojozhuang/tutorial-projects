package Johnny.Tutorials;

public class CustomClass {
    public String greet(String myname) {
        System.out.println("Hello!");
        return "Hello " + myname + ", greetings from CustomClass.greet().";
    }
    public static String greetStatic(String myname) {
        System.out.println("Hello!");
        return "Hello " + myname + ", greetings from CustomClass.greetStatic().";
    }
}
