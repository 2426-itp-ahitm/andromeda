package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.Command;
import at.ac.htlleonding.model.User;
import at.ac.htlleonding.model.User_Command;
import at.ac.htlleonding.model.dto.CommandDTO;
import at.ac.htlleonding.model.dto.LatestCommandExecutedDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

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

    public LatestCommandExecutedDTO latestCommandExecutedDTO(LatestCommandExecutedDTO latestCommandExecutedDTO){

        if (latestCommandExecutedDTO != null) {
            entityManager.persist(latestCommandExecutedDTO);
        }
        return latestCommandExecutedDTO;
    }

}

