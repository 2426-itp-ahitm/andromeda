package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.Statistics;
import at.ac.htlleonding.model.dto.LatestCommandExecutedDTO;
import at.ac.htlleonding.repository.StatisticsRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/andromeda/statistics")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StatisticsResource {

    @Inject
    StatisticsRepository statisticsRepository;

    @GET
    public Statistics getStatistics() {
        return statisticsRepository.findStats();
    }

    @POST
    @Path("/addLatestCommandExecuted")
    public Response addCommand(LatestCommandExecutedDTO dto) {
        try {
            LatestCommandExecutedDTO result = statisticsRepository.addLatestCommand(dto);
            return Response.ok(result).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse("Failed to add command: " + e.getMessage()))
                    .build();
        }
    }

    // Simple error response record
    public record ErrorResponse(String message) {}
}