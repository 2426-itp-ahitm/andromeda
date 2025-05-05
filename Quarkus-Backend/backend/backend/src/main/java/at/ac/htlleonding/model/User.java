package at.ac.htlleonding.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="dbUser")
@NamedQueries({
        @NamedQuery(name=User.QUERY_FIND_BY_USERID, query="select u from User u where id = :userId"),
        @NamedQuery(name=User.QUERY_FIND_ALL, query="select u from User u"),
})
public class User {

    public static final String QUERY_FIND_BY_USERID = "User.findById";
    public static final String QUERY_FIND_ALL = "User.findAll";
    //todo: email & password with keycloak
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Setting> settings = new ArrayList<Setting>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<User_Command> userCommands = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<User_Model> userModels = new ArrayList<>();

    public User() {}

    public User(String name, List<Setting> settings, List<User_Command> userCommands, List<User_Model> userModels) {
        this.id = id;
        this.name = name;
        this.settings = settings;
        this.userCommands = userCommands;
        this.userModels = userModels;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Setting> getSettings() {
        return settings;
    }

    public void setSettings(List<Setting> settings) {
        this.settings = settings;
    }

    public List<User_Command> getUserCommands() {
        return userCommands;
    }

    public void setUserCommands(List<User_Command> userCommands) {
        this.userCommands = userCommands;
    }

    public List<User_Model> getUserModels() {
        return userModels;
    }

    public void setUserModels(List<User_Model> userModels) {
        this.userModels = userModels;
    }

}
