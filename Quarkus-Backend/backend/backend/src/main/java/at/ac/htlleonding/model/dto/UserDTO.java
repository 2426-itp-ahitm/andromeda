package at.ac.htlleonding.model.dto;

import at.ac.htlleonding.model.Setting;
import at.ac.htlleonding.model.User_Command;
import at.ac.htlleonding.model.User_Model;

import java.util.List;

public record UserDTO(String name, List<Setting> settings, List<User_Command> userCommands, List<User_Model> userModels) {
}
