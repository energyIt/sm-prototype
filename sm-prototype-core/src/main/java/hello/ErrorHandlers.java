package hello;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This allows you to handle own exceptions.
 * Many exceptions are already handled.
 *
 * @author gregmil
 */
@ControllerAdvice
public class ErrorHandlers {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDTO processConstraintError(Locale locale, IllegalArgumentException ex) {

        ErrorDTO errs = new ErrorDTO();
        errs.addError(ex.getMessage());
        return errs;
    }

}
