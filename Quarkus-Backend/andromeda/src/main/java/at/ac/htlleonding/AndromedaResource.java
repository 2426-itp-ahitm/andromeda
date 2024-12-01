package at.ac.htlleonding;

import at.ac.htlleonding.model.Prompt;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/andromeda")
public class AndromedaResource {

    @Inject
    PromptRepository promptRepository;

    @POST
    @Path("/add")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response addPrompt(String content) {
        try {
            Prompt prompt = new Prompt(content);
            promptRepository.addPrompt(prompt);
            return Response.status(Response.Status.CREATED)
                    .entity(prompt)
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public Response getAllPrompts() {
        try {
            List<Prompt> prompts = this.promptRepository.getAllPrompts();
            return Response.status(Response.Status.OK)
                    .entity(prompts)
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.NO_CONTENT)
                    .build();
        }
    }



}
