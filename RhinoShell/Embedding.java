import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

public class Embedding {
    public static void main(String args[])
    {
        Context cx = Context.enter();
        try {
            Scriptable scope = cx.initStandardObjects();

            String jsStr="function f() { return 'hello from js function!';} f();";

            Object result = cx.evaluateString(scope, jsStr, null, 0, null);

            System.err.println(Context.toString(result));

        } finally {
            Context.exit();
        }
    }
}

