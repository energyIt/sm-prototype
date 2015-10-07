package sm.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
public class UserGroup extends AbstractRefdataEntity {

    @Id
    @NotNull
    @Size(min=16, max=16)
    private String id;

    @Size(min=3, max=100)
    private String id2;

    @Size(min=3, max=100)
    private String id3;

    private String name;

    @OneToMany(mappedBy = "userGroup", fetch = FetchType.LAZY)
    private List<User> users;

    public UserGroup() {
    }

    public UserGroup(String id, String id2, String id3) {
        this.id = id;
        this.id2 = id2;
        this.id3 = id3;
    }

    public String getId() {
        return id;
    }

    public String getId2() {
        return id2;
    }

    public String getId3() {
        return id3;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setId2(String id2) {
        this.id2 = id2;
    }

    public void setId3(String id3) {
        this.id3 = id3;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
