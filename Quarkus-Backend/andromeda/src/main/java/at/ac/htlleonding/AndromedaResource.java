package at.ac.htlleonding;

import at.ac.htlleonding.model.Prompt;
import at.ac.htlleonding.model.dtos.PromptDTO;
import at.ac.htlleonding.model.dtos.UserDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/andromeda")
public class AndromedaResource {

    @Inject
    AndromedaRepository andromedaRepository;

    @POST
    @Path("/addPrompt")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addPrompt(PromptDTO promptDTO) {
        try {

            Long userId = promptDTO.userId();
            String content = promptDTO.content();

            andromedaRepository.addPrompt(userId, content);
            return Response.status(Response.Status.CREATED)
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/prompts/listAll")
    public Response getAllPrompts() {
        try {
            List<Prompt> prompts = this.andromedaRepository.getAllPrompts();
            return Response.status(Response.Status.OK)
                    .entity(prompts)
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.NO_CONTENT)
                    .build();
        }
    }

    @POST
    @Path("/addUser")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(UserDTO userDTO) {
        Response.Status status = Response.Status.CREATED;
        try {
            String username = userDTO.username();
            andromedaRepository.addUser(username);

        } catch (Exception e) {
            status = Response.Status.BAD_REQUEST;
        }
        return Response.status(status)
                .build();

    }

    @GET
    @Path("/user/{userId}/prompts")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Prompt> getUserPrompts(@PathParam("userId") Long userId) {
        return andromedaRepository.getPromptsOfUser(userId);


    }

}