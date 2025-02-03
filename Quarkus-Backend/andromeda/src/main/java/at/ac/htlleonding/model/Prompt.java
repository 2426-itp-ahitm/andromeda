package at.ac.htlleonding.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name=Prompt.QUERY_FIND_ALL, query="select p from Prompt p"),
        @NamedQuery(name=Prompt.QUERY_FIND_ALL_BY_USER_ID, query="select p from Prompt p where p.user.id = :userId ")
})
public class Prompt {

    public static final String QUERY_FIND_ALL = "Prompt.findAll";
    public static final String QUERY_FIND_ALL_BY_USER_ID = "Prompt.findAllByUserId";

    @Id
    @GeneratedValue
    public Long id;

    public String content;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Prompt() {
    }

    public Prompt(User user, String content) {
        this.user = user;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}


