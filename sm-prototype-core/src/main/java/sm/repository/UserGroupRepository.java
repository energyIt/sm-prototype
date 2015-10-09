package sm.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import sm.model.UserGroup;

/**
 * Possible extensions (from spring data reference) :
 * <pre>
 *     The mechanism strips the prefixes find…By, read…By, query…By, count…By, and get…By from the method and starts parsing the rest of it.
 * </pre>
 *
 */
//@PreAuthorize("hasRole('ROLE_USER')")
@RepositoryRestResource(collectionResourceRel = "userGroup", path = "userGroup")
public interface UserGroupRepository extends PagingAndSortingRepository<UserGroup, String> {

    List<UserGroup> findById2(@Param("id2") String id2);

    List<UserGroup> findByName(@Param("name") String name);

    int countByName(@Param("name") String name);

}
