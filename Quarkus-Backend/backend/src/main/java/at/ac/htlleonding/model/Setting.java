package at.ac.htlleonding.model;

import jakarta.persistence.*;

@Entity
public class Setting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String value;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Setting() {}

    public Setting(Long id, String name, String type, String value, User user) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.value = value;
        this.user = user;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
