package at.ac.htlleonding.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "`user`")
@NamedQueries({
        @NamedQuery(name=User.QUERY_FIND_USER_BY_ID, query="select u from User u where u.id = :id"),
})
public class User {

    public  static final String QUERY_FIND_USER_BY_ID = "User.find_user_by_id";
    @Id
    @GeneratedValue
    private Long id;

    private String username;

    public User() {
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prompt> prompts = new ArrayList<Prompt>();

    public User(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
