package sm.repository;

import java.io.Serializable;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * See https://github.com/spring-projects/spring-data-examples/blob/master/rest/security/src/main/java/example/springdata/rest/security/SecurityConfiguration.java
 *
 * other options is to implement a {@link org.springframework.data.rest.core.annotation.RepositoryEventHandler} and secured those methods
 * @see UserEventHandler
 */
@PreAuthorize("hasRole('ROLE_USER')")
@NoRepositoryBean
public interface SecuredPagingAndSortingRepository<T, ID extends Serializable> extends PagingAndSortingRepository<T, ID> {

    String ONLY_ADMIN = "hasRole('ROLE_ADMIN')";

    @PreAuthorize(ONLY_ADMIN)
    @Override
    <S extends T> S save(S entity);

    @PreAuthorize(ONLY_ADMIN)
    @Override
    <S extends T> Iterable<S> save(Iterable<S> entities);

    @PreAuthorize(ONLY_ADMIN)
    @Override
    void delete(ID id);

    @PreAuthorize(ONLY_ADMIN)
    @Override
    void delete(T entity);

    @PreAuthorize(ONLY_ADMIN)
    @Override
    void delete(Iterable<? extends T> entities);

    @PreAuthorize(ONLY_ADMIN)
    @Override
    void deleteAll();
}
