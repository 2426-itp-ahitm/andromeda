package at.ac.htlleonding.model;

import jakarta.persistence.*;

@Entity
public class User_Model {

    @EmbeddedId
    @AttributeOverride(name="userId", column=@Column(name="user_id"))
    @AttributeOverride(name="modelId", column = @Column(name="model_id"))
    private UserModelId userModelId;

    @ManyToOne
    @MapsId("userId")
    private User user;

    @ManyToOne
    @MapsId("modelId")
    private Model model;

    private boolean active;

    public User_Model() {
    }

    public User_Model(UserModelId userModelId, User user, Model model, boolean active) {
        this.userModelId = userModelId;
        this.user = user;
        this.model = model;
        this.active = active;
    }

    public UserModelId getUserModelId() {
        return userModelId;
    }

    public void setUserModelId(UserModelId userModelId) {
        this.userModelId = userModelId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
