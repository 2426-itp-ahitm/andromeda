package at.ac.htlleonding.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NamedQueries({
        @NamedQuery(name = Command.QUERY_FIND_ALL, query = "select c from Command c"),
        @NamedQuery(name = Command.QUERY_FIND_ALL_DEFAULT, query = "select c from Command c where type = 0")
})
public class Command {

    public static final String QUERY_FIND_ALL = "Command.findAll";
    public static final String QUERY_FIND_ALL_DEFAULT = "Command.getDefaultCommands";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer type; //default 0 or personalized 1

    private String prompt;

    @Column(columnDefinition = "TEXT")
    private String code;

    @OneToMany(mappedBy = "command", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    public List<User_Command> userCommands = new ArrayList<>();

    public Command() {
    }

    public Command(Integer type, String prompt, String code) {
        this.type = type;
        this.prompt = prompt;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<User_Command> getUserCommands() {
        return userCommands;
    }

    public void setUserCommands(List<User_Command> userCommands) {
        this.userCommands = userCommands;
    }
}
