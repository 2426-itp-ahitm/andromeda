package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.Statistics;
import at.ac.htlleonding.repository.StatisticsRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/statistics")
@Produces(MediaType.APPLICATION_JSON)
public class StatisticsResource {

    @Inject
    StatisticsRepository statisticsRepository;

    @GET
    public List<Statistics> getStatistics() {
        return statisticsRepository.findAll();
    }
}
