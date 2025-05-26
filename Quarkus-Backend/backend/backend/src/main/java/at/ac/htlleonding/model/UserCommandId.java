package at.ac.htlleonding.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserCommandId implements Serializable {

    private Long userId;
    private Long commandId;

    public UserCommandId() {


    }

    public UserCommandId(Long userId, Long commandId) {
        this.userId = userId;
        this.commandId = commandId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCommandId() {
        return commandId;
    }

    public void setCommandId(Long commandId) {
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
