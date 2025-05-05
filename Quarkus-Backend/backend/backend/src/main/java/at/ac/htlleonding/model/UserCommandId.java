package at.ac.htlleonding.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserCommandId implements Serializable {

    private Integer userId;
    private Integer commandId;

    public UserCommandId() {


    }

    public UserCommandId(Integer userId, Integer commandId) {
        this.userId = userId;
        this.commandId = commandId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCommandId() {
        return commandId;
    }

    public void setCommandId(Integer commandId) {
        this.commandId = commandId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserCommandId that = (UserCommandId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(commandId, that.commandId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, commandId);
    }
}
