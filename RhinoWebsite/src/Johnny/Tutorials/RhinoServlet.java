package Johnny.Tutorials;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.RhinoException;

/**
 * Servlet implementation class RhinoServlet
 */
@WebServlet("/RhinoServlet")
public class RhinoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RhinoServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        response.setContentType("text/plain");
        String code = request.getParameter("code");
        Context ctx = Context.enter();
        try {
            Scriptable scope = ctx.initStandardObjects();
            Object result = ctx.evaluateString(scope, code, "<code>", 1, null);
            response.getWriter().print(Context.toString(result));
        } catch(RhinoException ex) {
            response.getWriter().println(ex.getMessage());
        } finally {
            Context.exit();
        }
    }

}
