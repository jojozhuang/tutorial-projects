<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript">
      function sendCode() {
        var code = $("#code").val();
        $("#output").load("/RhinoDataFix/JavascriptServlet", {"code": code});
      }
    </script>
    <title>Data Fix with Javascript</title>
  </head>

  <body>
  <jsp:include page="header.jsp" />
    <div class="container">
      <h1>Input scripts to fix data</h1>
      <form>
        <div class="form-group">
          <label for="code">Javascript:</label>
          <textarea class="form-control" rows="6" id="code"></textarea>
        </div>
        <button type="button" class="btn btn-primary" onclick="sendCode();" >Submit</button>
        <div class="form-group">
          <label for="output">Output:</label>
          <textarea class="form-control" rows="10" id="output" readonly="true"></textarea>
        </div>
      </form>
    </div>
  </body>
</html>