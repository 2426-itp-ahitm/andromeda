package at.ac.htlleonding.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Statistics {

    @Id
    @GeneratedValue
    private Long id;
    public double responseTime = 0.1;

    @OneToMany(mappedBy = "statistics")
    @JsonIgnoreProperties({"statistics"})
    private List<LatestCommandExecuted> latestCommandsExecuted = new ArrayList<>();

    public Statistics() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(double responseTime) {
        this.responseTime = responseTime;
    }

    public List<LatestCommandExecuted> getLatestCommandsExecuted() {
        return latestCommandsExecuted;
    }

    public void setLatestCommandsExecuted(List<LatestCommandExecuted> latestCommandsExecuted) {
        this.latestCommandsExecuted = latestCommandsExecuted;
    }
}
