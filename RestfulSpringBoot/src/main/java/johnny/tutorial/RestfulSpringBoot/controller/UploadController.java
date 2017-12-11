package johnny.tutorial.RestfulSpringBoot.controller;

import johnny.tutorial.RestfulSpringBoot.domain.ResponseResult;
import johnny.tutorial.RestfulSpringBoot.domain.UploadModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

@RestController
//@RequestMapping("/images")
public class UploadController {

	@Autowired
	ServletContext context;
	
    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "F://temp//";

    // 3.1.1 Single file upload
    @PostMapping("/api/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile uploadfile) {

    		ResponseResult rr = new ResponseResult();
    		
        if (uploadfile.isEmpty()) {
        		return ResponseEntity.ok().body("please select a file!");
        }

        try {
        		String filepath = saveUploadedFiles(Arrays.asList(uploadfile));
        		rr.setMessage(filepath);
        } catch (IOException e) {
        		return ResponseEntity.badRequest().build();
        }

        rr.setstatusCode(200);
        return ResponseEntity.ok(rr);
    }

    // 3.1.2 Multiple file upload
    @PostMapping("/api/upload/multi")
    public ResponseEntity<?> uploadFileMulti(
            @RequestParam("extraField") String extraField,
            @RequestParam("files") MultipartFile[] uploadfiles) {

        // Get file name
        String uploadedFileName = Arrays.stream(uploadfiles).map(x -> x.getOriginalFilename())
                .filter(x -> !StringUtils.isEmpty(x)).collect(Collectors.joining(","));

        if (StringUtils.isEmpty(uploadedFileName)) {
        		return ResponseEntity.ok().body("please select a file!");
        }

        try {
            saveUploadedFiles(Arrays.asList(uploadfiles));
        } catch (IOException e) {
        		return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body("Successfully uploaded - " + uploadedFileName);
    }

    // 3.1.3 maps html form to a Model
    @PostMapping("/api/upload/multi/model")
    public ResponseEntity<?> multiUploadFileModel(@ModelAttribute UploadModel model) {

        try {
            saveUploadedFiles(Arrays.asList(model.getFiles()));
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body("Successfully uploaded!");
    }

    //save file
    private String saveUploadedFiles(List<MultipartFile> files) throws IOException {
    		String filepath = "";
    		String filename = "";
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            byte[] bytes = file.getBytes();
            long TICKS_AT_EPOCH = 621355968000000000L; 
            long tick = System.currentTimeMillis()*10000 + TICKS_AT_EPOCH;
            filename = String.valueOf(tick).concat("_").concat(file.getOriginalFilename());
            
            //filepath = context.getRealPath("/static/images") + filename;
            filepath = "/Users/i857285/Johnny/GitHub/Tutorials/RestfulSpringBoot/src/main/resources/static/images/"+filename;
            Path path = Paths.get(filepath);
            Files.write(path, bytes);
        }
        return getBaseEnvLinkURL() + "/images/"+filename;
    }
    
    protected static String getBaseEnvLinkURL() {
    	 
    	   String baseEnvLinkURL=null;
    	   HttpServletRequest currentRequest = 
    	      ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
    	   // lazy about determining protocol but can be done too
    	   baseEnvLinkURL = "http://" + currentRequest.getLocalName();
    	   if(currentRequest.getLocalPort() != 80) {
    	      baseEnvLinkURL += ":" + currentRequest.getLocalPort();
    	   }
    	   if(!StringUtils.isEmpty(currentRequest.getContextPath())) {
    	      baseEnvLinkURL += currentRequest.getContextPath();
    	   }            
    	   return baseEnvLinkURL;
    	}
}
