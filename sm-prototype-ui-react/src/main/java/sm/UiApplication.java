package sm;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@SpringBootApplication
@Import(Application.class)
public class UiApplication extends RepositoryRestMvcConfiguration implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(UiApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        //  some init here
    }
}
