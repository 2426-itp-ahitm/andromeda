package at.ac.htlleonding;

import at.ac.htlleonding.model.Prompt;
import at.ac.htlleonding.model.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class AndromedaRepository {

    @Inject
    EntityManager em;

    public List<Prompt> getAllPrompts() {
        return this.em.createNamedQuery(Prompt.QUERY_FIND_ALL, Prompt.class).getResultList();
    }

    @Transactional
    public void addPrompt(Long userId, String content) {

        User user = em.find(User.class, userId);

        if (user == null) {
            return;
        } else {
            Prompt prompt = new Prompt(user, content);
            this.em.persist(prompt);
            return;
        }
    }

    @Transactional
    public void addUser(String username) {

        User user = new User(username);
        this.em.persist(user);
        return;
    }

    public User getUserById(Long id) {
        TypedQuery<User> query = em.createNamedQuery(User.QUERY_FIND_USER_BY_ID, User.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }


    public List<Prompt> getPromptsOfUser(Long userId) {
        TypedQuery<Prompt> query = em.createNamedQuery(Prompt.QUERY_FIND_ALL_BY_USER_ID, Prompt.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
}
