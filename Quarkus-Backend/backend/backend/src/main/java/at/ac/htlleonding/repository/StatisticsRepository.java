package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.Statistics;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@ApplicationScoped
public class StatisticsRepository {

    @PersistenceContext
    private EntityManager em;

    /*
    public Statistics find(Long id) {
        return em.find(Statistics.class, id);
    }*/

    public List<Statistics> findAll() {
        return em.createQuery("SELECT s FROM Statistics s", Statistics.class).getResultList();
    }
}
