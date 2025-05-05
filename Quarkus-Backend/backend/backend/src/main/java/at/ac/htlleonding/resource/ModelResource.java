package at.ac.htlleonding.resource;

import at.ac.htlleonding.model.Model;
import at.ac.htlleonding.repository.ModelRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/andromeda/model")
public class ModelResource {

    @Inject
    ModelRepository modelRepository;

    @GET
    @Path("/getModels")
    public Response getModels() {
        try {
            List<Model> models = modelRepository.getModels();
            return Response.status(Response.Status.OK)
                    .entity(models)
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

}
