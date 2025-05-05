package at.ac.htlleonding.model;

import jakarta.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name=User_Command.QUERY_FIND_BY_USERID, query="select uc.command from User_Command uc where uc.user.id = :userId")
})
public class User_Command {

    public static final String QUERY_FIND_BY_USERID = "User_Command.findByUserId";

    @EmbeddedId
    @AttributeOverride(name="userId", column=@Column(name="user_id"))
    @AttributeOverride(name="commandId", column = @Column(name="command_id"))
    private UserCommandId userCommandId;

    @ManyToOne
    @MapsId("userId")
    private User user;

    @ManyToOne
    @MapsId("commandId")
    private Command command;

    //it is "default" or "personalised"
    private String type;

    public User_Command() {
    }

    public User_Command(UserCommandId userCommandId, User user, Command command, String type) {
        this.userCommandId = userCommandId;
        this.user = user;
        this.command = command;
        this.type = type;
    }

    public UserCommandId getUserCommandId() {
        return userCommandId;
    }

    public void setUserCommandId(UserCommandId userCommandId) {
        this.userCommandId = userCommandId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
