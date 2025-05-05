package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.Command;
import at.ac.htlleonding.model.User_Command;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class CommandRepository {

    @Inject
    EntityManager entityManager;


    public List<Command> getDefaultCommands() {
        return entityManager.createNamedQuery(Command.QUERY_FIND_ALL_DEFAULT, Command.class).getResultList();
    }

    public List<User_Command> getCommandsByUser(Long id) {
        TypedQuery<User_Command> query = entityManager.createNamedQuery(User_Command.QUERY_FIND_BY_USERID, User_Command.class);
        query.setParameter("id", id);
        return query.getResultList();
    }
}
