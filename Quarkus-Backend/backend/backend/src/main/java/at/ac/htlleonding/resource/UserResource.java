package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.User;
import at.ac.htlleonding.model.dto.UserDTO;
import at.ac.htlleonding.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.List;


@Path("/api/andromeda/user")
public class UserResource {

    @Inject
    UserRepository userRepository;

    @POST
    @Path("/addUser")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(UserDTO userDTO) {
        try {
            userRepository.addUser(userDTO);
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/updateUser")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response     updateUser(UserDTO userDTO) {
        try {
            userRepository.updateUser(userDTO);
            return Response.status(Response.Status.OK).build();
        } catch(Exception e ) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/getUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        try {
            List<User> users = userRepository.getUsers();
            return Response.status(Response.Status.OK).entity(users).build();
        } catch(Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

}
