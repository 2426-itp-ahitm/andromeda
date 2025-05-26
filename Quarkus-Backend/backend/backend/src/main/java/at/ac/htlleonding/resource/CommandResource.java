package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.Command;
import at.ac.htlleonding.model.User_Command;
import at.ac.htlleonding.repository.CommandRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/andromeda/command")
public class CommandResource {

    @Inject
    CommandRepository commandRepository;

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
        //todo: repo getCommandsByUser
            List<Command> commands = commandRepository.getCommandsByUser(userId);
            return Response.status(Response.Status.OK).entity(commands).build();

    }

    @POST
    @Path("/addCommandToUser/{userId}")
    public Response addCommandToUser() {
        return Response.status(Response.Status.OK).build();
    }
}
