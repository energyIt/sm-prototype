package sm.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * This application is secured at both the URL level for some parts, and the method level for other parts. The URL
 * security is shown inside this code, while method-level annotations are enabled at by
 * {@link EnableGlobalMethodSecurity}.
 *
 * see https://github.com/spring-projects/spring-data-examples/tree/master/rest/security
 * see https://jaxenter.com/rest-api-spring-java-8-112289.html
 *
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    /**
     * This section defines the user accounts which can be used for authentication as well as the roles each user has.
     *
     * @see org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter#configure(org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder)
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().//
                withUser("SMUSER01").password("test01").roles("USER").and().//
                withUser("SMADMIN01").password("test01").roles("USER", "ADMIN");
    }

    /**
     * This section defines the security policy for the app.
     * <p>
     * <ul>
     * <li>BASIC authentication is supported (enough for this REST-based demo).</li>
     * <li>/employees is secured using URL security shown below.</li>
     * <li>CSRF headers are disabled since we are only testing the REST interface, not a web one.</li>
     * </ul>
     * NOTE: GET is not shown which defaults to permitted.
     *
     * @param http
     * @throws Exception
     * @see org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter#configure(org.springframework.security.config.annotation.web.builders.HttpSecurity)
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().and().authorizeRequests().//
                antMatchers(HttpMethod.POST, "/user**").hasRole("ADMIN").
                antMatchers(HttpMethod.PUT, "/user**").hasRole("ADMIN").
                antMatchers(HttpMethod.PATCH, "/user**").hasRole("ADMIN").
                antMatchers(HttpMethod.DELETE, "/user**").hasRole("ADMIN").
                and().csrf().disable();
    }
}
