package at.ac.htlleonding.repository;

import at.ac.htlleonding.model.Setting;
import at.ac.htlleonding.model.User;
import at.ac.htlleonding.model.dto.SettingDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class SettingRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public Setting addSetting(SettingDTO settingDTO) {

        if(settingDTO != null) {
            User user = entityManager.find(User.class, settingDTO.userId());
            if (user != null) {
                Setting setting = new Setting(settingDTO.name(), settingDTO.type(), settingDTO.value(), user);
                entityManager.persist(setting);
                return setting;
            }
        }
        return null;
    }

    @Transactional
    public void deleteSetting(Long id) {
        Setting setting = entityManager.find(Setting.class, id);
        if(setting != null) {
            entityManager.remove(setting);
        }
    }

    @Transactional
    public void updateSetting(SettingDTO settingDTO) {
        entityManager.merge(settingDTO);
    }

    public List<SettingDTO> getSettingsByUser(Long userId) {
        User user = entityManager.find(User.class, userId);
        return user.getSettings().stream()
                .map(setting -> new SettingDTO(
                        setting.getId(),
                        setting.getName(),
                        setting.getType(),
                        setting.getValue(),
                        setting.getUser().getId()
                ))
                .toList();
    }

    public SettingDTO getSettingByUser(Long userId, String settingName) {
        List<SettingDTO> settings = getSettingsByUser(userId);
        for(SettingDTO setting : settings) {
            return setting;
        }
        return null;
    }
}
