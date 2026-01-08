package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.Command;
import at.ac.htlleonding.model.LatestCommandExecuted;
import at.ac.htlleonding.model.Statistics;
import at.ac.htlleonding.model.dto.LatestCommandExecutedDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;

@ApplicationScoped
public class StatisticsRepository {

    @Inject
    private EntityManager em;

    private static final Long STATS_ID = 1L;
    private static final int MAX_COMMANDS = 3;

    public Statistics findStats() {
        Statistics stats = em.find(Statistics.class, STATS_ID);

        if (stats == null) {
            // Return empty statistics if not yet created
            return new Statistics(STATS_ID, List.of());
        }

        return stats;
    }

    @Transactional
    public LatestCommandExecutedDTO addLatestCommand(LatestCommandExecutedDTO dto) {
        // 1. VALIDATE COMMAND EXISTS
        Command command = em.find(Command.class, dto.commandId());
        if (command == null) {
            throw new NotFoundException("Command with ID " + dto.commandId() + " not found");
        }

        // 2. ENSURE STATISTICS SINGLETON EXISTS
        Statistics statsRef = em.find(Statistics.class, STATS_ID);
        if (statsRef == null) {
            statsRef = new Statistics();
            statsRef.setId(STATS_ID);
            em.persist(statsRef);
            em.flush();
        }

        // 3. REMOVE OLDEST COMMAND IF WE'RE AT MAX CAPACITY (BEFORE adding new one)
        List<LatestCommandExecuted> currentCommands = em.createQuery(
                        "SELECT l FROM LatestCommandExecuted l WHERE l.statistics.id = :statsId ORDER BY l.id DESC",
                        LatestCommandExecuted.class
                )
                .setParameter("statsId", STATS_ID)
                .getResultList();

        if (currentCommands.size() >= MAX_COMMANDS) {
            // Remove the oldest command(s) to make room
            for (int i = MAX_COMMANDS - 1; i < currentCommands.size(); i++) {
                em.remove(currentCommands.get(i));
            }
            em.flush();
        }

        // 4. CREATE NEW COMMAND with Command's prompt as name
        LatestCommandExecuted newCmd = new LatestCommandExecuted(
                command.getPrompt(),  // Use the command's prompt as the name
                dto.timestamp(),
                statsRef,
                command  // Link to the actual command
        );

        em.persist(newCmd);
        em.flush();

        // Return DTO with the actual name used (command's prompt)
        return new LatestCommandExecutedDTO(
                command.getPrompt(),
                dto.timestamp(),
                dto.commandId()
        );
    }

    @Transactional
    public void clearOldCommands() {
        // Utility method to clean up if needed
        List<LatestCommandExecuted> allCommands = em.createQuery(
                        "SELECT l FROM LatestCommandExecuted l WHERE l.statistics.id = :statsId ORDER BY l.id DESC",
                        LatestCommandExecuted.class
                )
                .setParameter("statsId", STATS_ID)
                .getResultList();

        if (allCommands.size() > MAX_COMMANDS) {
            for (int i = MAX_COMMANDS; i < allCommands.size(); i++) {
                em.remove(allCommands.get(i));
            }
        }
    }
}