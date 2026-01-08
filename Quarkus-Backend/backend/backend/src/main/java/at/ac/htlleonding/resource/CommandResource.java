package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.Command;
import at.ac.htlleonding.model.Statistics;
import at.ac.htlleonding.model.dto.CommandDTO;
import at.ac.htlleonding.model.dto.LatestCommandExecutedDTO;
import at.ac.htlleonding.repository.CommandRepository;
import at.ac.htlleonding.repository.StatisticsRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/andromeda/command")
public class CommandResource {

    @Inject
    CommandRepository commandRepository;

    @Inject
    StatisticsRepository statisticsRepository;

    // --- EXISTING ENDPOINTS ---

    @GET
    @Path("/getDefaultCommands")
    public Response getDefaultCommands() {
        try {
            List<Command> commands = commandRepository.getDefaultCommands();
            return Response.status(Response.Status.OK).entity(commands).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/getCommandsByUser/{userId}")
    public Response getCommandsByUser(@PathParam("userId") Long userId) {
        List<Command> commands = commandRepository.getCommandsByUser(userId);
        return Response.status(Response.Status.OK).entity(commands).build();
    }

    @POST
    @Path("/addCommand/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCommandToUser(CommandDTO commandDTO) {
        Command command = commandRepository.addCommand(commandDTO);
        if(command == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        return Response.status(Response.Status.OK).entity(command).build();
    }
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCommand(@PathParam("id") Long id, CommandDTO commandDTO) {
        if (commandDTO == null || id == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        Command command = commandRepository.updateCommand(id, commandDTO);
        return Response.status(Response.Status.OK).entity(command).build();
    }

    // --- NEW / MODIFIED ENDPOINTS ---

    @GET
    @Path("/statistics")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStatistics() {
        // FIXED: Method name matches StatisticsRepository
        Statistics stats = statisticsRepository.findStats();
        return Response.ok(stats).build();
    }

    @POST
    @Path("/addLatestCommandExecuted/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addLatestCommandExecuted(LatestCommandExecutedDTO latestCommandExecutedDTO) {
        // FIXED: Method name matches StatisticsRepository
        LatestCommandExecutedDTO command = statisticsRepository.addLatestCommand(latestCommandExecutedDTO);

        if(command == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        return Response.status(Response.Status.OK).entity(command).build();
    }
}