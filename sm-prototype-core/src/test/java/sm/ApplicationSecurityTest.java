package sm;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration("src/resources/static")
public class ApplicationSecurityTest {

    public static final String USER_GROUP = "{  \"id\" : \"A123456789123--1\",  \"id3\" : \"id-1\", \"name\" : \"Group 1\" }";

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private FilterChainProxy springSecurityFilterChain; // to init security

    private MockMvc mockMvc;


    @Before
    public final void initMockMvc() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).addFilter(springSecurityFilterChain).build();
    }

    @Test
    public void testGetUserGroupsWithLogin() throws Exception {
        mockMvc.perform(get("/api/userGroup").with(basicAuth("SMUSER01")))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(jsonPath("_links.self").exists());
    }

    private RequestPostProcessor basicAuth(String userId) {
        return SecurityMockMvcRequestPostProcessors.httpBasic(userId, "test01");
    }

    @Test
    public void createWithNormalUserShouldBeForbidden() throws Exception {
        mockMvc.perform(post("/api/userGroup").with(basicAuth("SMUSER01")).
                content(USER_GROUP))
                .andExpect(status().isForbidden());
    }

    @Test
    public void allRequestsMustbeAuthorized() throws Exception {
        mockMvc.perform(get("/api/userGroup")).andExpect(status().isUnauthorized());
    }

    @Test
    public void createWithAdminAndGetById() throws Exception {

        mockMvc.perform(post("/api/userGroup").with(basicAuth("SMADMIN01")).
                content(USER_GROUP))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/userGroup/A123456789123--1").with(basicAuth("SMADMIN01")))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(jsonPath("id").value("A123456789123--1"))
                .andExpect(jsonPath("name").value("Group 1"));
    }
}
