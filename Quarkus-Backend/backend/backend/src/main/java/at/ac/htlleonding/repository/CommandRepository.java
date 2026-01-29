package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.*;
import at.ac.htlleonding.model.dto.CommandDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.List;

@ApplicationScoped
public class CommandRepository {

    @Inject
    EntityManager entityManager;

    public List<Command> getDefaultCommands() {
        return entityManager.createNamedQuery(Command.QUERY_FIND_ALL_DEFAULT, Command.class).getResultList();
    }

    public List<Command> getCommandsByUser(Long id) {
        TypedQuery<Command> query = entityManager.createNamedQuery(User_Command.QUERY_FIND_ALL_PERSONALIZED_BY_USERID, Command.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    @Transactional
    public Command addCommand(CommandDTO commandDTO) {
        if(commandDTO.userId() == null) {
            Command command = new Command(0, commandDTO.prompt(), commandDTO.code());
            entityManager.persist(command);
            return command;
        }
        User user = entityManager.find(User.class, commandDTO.userId());
        Command command = new Command(1, commandDTO.prompt(), commandDTO.code());
        if(user != null) {
            entityManager.persist(command);
            User_Command userCommand = new User_Command(user, command);
            entityManager.persist(userCommand);
            return command;
        }
        return null;
    }

    @Transactional
    public Command updateCommand(Long id, CommandDTO commandDTO) {
        if(commandDTO.userId() == null || id == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else{
            Command command = entityManager.find(Command.class, id);
            command.setPrompt(commandDTO.prompt());
            command.setCode(commandDTO.code());
            return command;
        }
    }
}