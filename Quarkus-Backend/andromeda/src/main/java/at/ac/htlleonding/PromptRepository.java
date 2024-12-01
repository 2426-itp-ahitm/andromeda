package at.ac.htlleonding;

import at.ac.htlleonding.model.Prompt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class PromptRepository {

    @Inject
    EntityManager em;

    public List<Prompt> getAllPrompts() {
        return this.em.createNamedQuery(Prompt.QUERY_FIND_ALL, Prompt.class).getResultList();
    }

    @Transactional
    public Prompt addPrompt(Prompt prompt) {
        this.em.persist(prompt);
        return prompt;
    }


}
