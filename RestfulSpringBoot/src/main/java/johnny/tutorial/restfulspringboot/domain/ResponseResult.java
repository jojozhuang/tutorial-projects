package johnny.tutorial.restfulspringboot.domain;

public class ResponseResult {
    private int statusCode;
    private String message;

    public ResponseResult(){}
    public ResponseResult(int statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }
    
    public int getstatusCode() {
        return statusCode;
    }

    public void setstatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
