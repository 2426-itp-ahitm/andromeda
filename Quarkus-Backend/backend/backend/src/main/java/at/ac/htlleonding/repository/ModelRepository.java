package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.Model;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class ModelRepository {

    @Inject
    EntityManager entityManager;

    public List<Model> getModels() {
        return this.entityManager.createNamedQuery(Model.QUERY_FIND_ALL, Model.class).getResultList();
    }
}
