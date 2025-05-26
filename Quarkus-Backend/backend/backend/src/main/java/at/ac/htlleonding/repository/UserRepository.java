package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.User;
import at.ac.htlleonding.model.dto.UserDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class UserRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void updateUser(UserDTO userDTO) {
        entityManager.merge(userDTO);
    }

    @Transactional
    public void addUser(UserDTO userDTO) {
        User user = new User(userDTO.name(), null, null, null);
        entityManager.persist(user);
    }

    public List<User> getUsers() {
        TypedQuery<User> query = entityManager.createNamedQuery(User.QUERY_FIND_ALL, User.class);
        return query.getResultList();
    }
}
