package sm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import sm.model.User;
import sm.model.UserGroup;
import sm.repository.UserGroupRepository;
import sm.repository.UserRepository;
import sm.validation.BeforeCreateUserValidator;

@SpringBootApplication
public class Application extends RepositoryRestMvcConfiguration implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    private BeforeCreateUserValidator beforeCreateUserValidator;

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Override
    public void run(String... strings) throws Exception {
        //  some init here
        UserGroup userGroup = new UserGroup();
        userGroup.setName("name");
        userGroup.setId("1234567890123456");
        userGroup.setId2("id2");
        userGroup.setId3("id3");

        UserGroup userGroup1 = new UserGroup();
        userGroup1.setName("blabla");
        userGroup1.setId("6543210987654321");
        userGroup1.setId2("ID2");
        userGroup1.setId3("ID3");

        userGroupRepository.save(userGroup);
        userGroupRepository.save(userGroup1);
    }

    /**
     * translates javax validation to spring validation
     */
    @Bean
    org.springframework.validation.Validator validator() {
        return new LocalValidatorFactoryBean();
    }

    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class, UserGroup.class);
        config.setBaseUri("/api");
    }

    @Override
    protected void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
        String[] events = { "beforeCreate", "beforeSave" };
        for (String event : events) {
            validatingListener.addValidator(event, validator());
        }
        validatingListener.addValidator("beforeCreate", beforeCreateUserValidator);
    }

}
