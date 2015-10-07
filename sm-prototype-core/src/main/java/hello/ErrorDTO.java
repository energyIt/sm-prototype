package hello;

import java.util.ArrayList;
import java.util.List;

public class ErrorDTO {
 
    private List<String> errors = new ArrayList<>();
 
    public ErrorDTO() {
 
    }
 
    public void addError(String message) {
        errors.add(message);
    }

    public List<String> getErrors() {
        return errors;
    }
}
