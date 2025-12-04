package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.Statistics;
import at.ac.htlleonding.repository.StatisticsRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/andromeda/statistics")
@Produces(MediaType.APPLICATION_JSON)
public class StatisticsResource {

    @Inject
    StatisticsRepository statisticsRepository;

    @GET
    public Statistics getStatistics() {
        // This will now return the object containing only the latest 3 commands
        return statisticsRepository.findStats();
    }
}