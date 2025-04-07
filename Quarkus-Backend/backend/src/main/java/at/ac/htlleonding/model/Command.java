package at.ac.htlleonding.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Command {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String prompt;

    private String code;

    @OneToMany(mappedBy = "command", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<User_Command> userCommands = new ArrayList<>();

    public Command() {
    }

    public Command(Long id, String type, String prompt, String code, List<User_Command> userCommands) {
        this.id = id;
        this.type = type;
        this.prompt = prompt;
        this.code = code;
        this.userCommands = userCommands;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
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
