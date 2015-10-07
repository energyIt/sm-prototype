package sm.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeLinkDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeLinkSave;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import sm.model.AbstractRefdataEntity;
import sm.model.User;
import sm.model.UserGroup;

/**
 * see https://gerrydevstory.com/2015/01/15/restful-web-service-with-spring-data-rest-and-spring-security/
 * only to authorize the management operations
 *
 * other options is to make the repo extend {@link SecuredPagingAndSortingRepository}
 *
 * @author gregmil
 */
@Component
@RepositoryEventHandler({User.class, UserGroup.class})
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(UserEventHandler.class);

    @HandleBeforeSave
    public void handleBeforeSave(AbstractRefdataEntity c) {
        LOG.info("Before save {}", c);
    }

    @HandleBeforeCreate
    public void handleBeforeCreate(AbstractRefdataEntity c) {
        LOG.info("Before create {}", c);
    }

    @HandleBeforeLinkSave
    public void handleBeforeLinkSave(AbstractRefdataEntity c) {
        LOG.info("Before link save {}", c);
    }

    @HandleBeforeDelete
    public void handleBeforeDelete(AbstractRefdataEntity c) {
        LOG.info("Before delete {}", c);
    }

    @HandleBeforeLinkDelete
    public void handleBeforeLinkDelete(AbstractRefdataEntity c) {
        LOG.info("Before link delete {}", c);
    }
}
