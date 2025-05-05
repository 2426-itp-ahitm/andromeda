package at.ac.htlleonding.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserModelId implements Serializable {

    private Integer userId;
    private Integer modelId;

    public UserModelId() {}

    public UserModelId(Integer userId, Integer modelId) {
        this.userId = userId;
        this.modelId = modelId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCommandId() {
        return modelId;
    }

    public void setCommandId(Integer commandId) {
        this.modelId = commandId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserModelId that = (UserModelId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(modelId, that.modelId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, modelId);
    }
}
