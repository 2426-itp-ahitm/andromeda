package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.LatestCommandExecuted;
import at.ac.htlleonding.model.Statistics;
import at.ac.htlleonding.model.dto.LatestCommandExecutedDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class StatisticsRepository {

    @Inject
    private EntityManager em;

    private static final Long STATS_ID = 1L;

    public Statistics findStats() {
        // Use the ID to find the wrapper (or create logic to handle if missing, though typically GET comes after POST)
        // Here we just fetch the list for the view
        List<LatestCommandExecuted> commands = em.createQuery(
                "SELECT l FROM LatestCommandExecuted l ORDER BY l.id DESC",
                LatestCommandExecuted.class
        ).getResultList();

        return new Statistics(STATS_ID, commands);
    }

    @Transactional
    public LatestCommandExecutedDTO addLatestCommand(LatestCommandExecutedDTO dto) {

        // 1. ENSURE STATISTICS SINGLETON EXISTS
        Statistics statsRef = em.find(Statistics.class, STATS_ID);

        if (statsRef == null) {
            statsRef = new Statistics();
            statsRef.setId(STATS_ID); // Manual ID assignment
            // Use merge to be safe, though persist works if @GeneratedValue is gone
            statsRef = em.merge(statsRef);
        }

        // 2. CREATE COMMAND
        LatestCommandExecuted newCmd = new LatestCommandExecuted(
                dto.name(),
                dto.timestamp(),
                statsRef
        );

        em.persist(newCmd);
        em.flush(); // Force DB write to generate the ID for newCmd

        // 3. CLEANUP (Keep Top 3)
        List<LatestCommandExecuted> allCommands = em.createQuery(
                "SELECT l FROM LatestCommandExecuted l ORDER BY l.id DESC",
                LatestCommandExecuted.class
        ).getResultList();

        if (allCommands.size() > 3) {
            for (int i = 3; i < allCommands.size(); i++) {
                em.remove(allCommands.get(i));
            }
        }

        return dto;
    }
}