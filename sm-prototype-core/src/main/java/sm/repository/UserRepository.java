package sm.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import sm.model.User;

/**
 * Possible extensions (from spring data reference) :
 * <pre>
 *     The mechanism strips the prefixes find…By, read…By, query…By, count…By, and get…By from the method and starts parsing the rest of it.
 * </pre>
 *
 */
@PreAuthorize("hasRole('ROLE_USER')")
@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepository extends PagingAndSortingRepository<User, String> {

    List<User> findByUserGroupId(@Param("userGroup.id") String userGroupId);

    int countByName(@Param("name") String name);

}
