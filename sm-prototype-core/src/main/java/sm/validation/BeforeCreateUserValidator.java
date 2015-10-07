package sm.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import sm.Application;
import sm.model.User;
import sm.repository.UserRepository;

/**
 * Example of special validation.
 * Is autmaticly wired by spring due to the naming convention since "BeforeCreate" is a known event.
 *
 * Needs to be registered in :
 * {@link Application#configureValidatingRepositoryEventListener(org.springframework.data.rest.core.event.ValidatingRepositoryEventListener)}
 *
 */
@Component
public class BeforeCreateUserValidator implements Validator {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.isAssignableFrom(User.class);
    }

    @Override
    public void validate(Object target, Errors errors) {
        if (target instanceof User) {
            User user = ((User) target);
            if (userRepository.countByName(user.getName()) > 0) {
                errors.rejectValue("name", "error.nameUsed", "user name used");
            }
        }

    }
}
