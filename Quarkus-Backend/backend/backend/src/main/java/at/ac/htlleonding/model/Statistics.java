package at.ac.htlleonding.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Statistics {

    @Id
    // @GeneratedValue(...)  <-- DELETE THIS LINE.
    // We want to manually set the ID to 1L every time.
    private Long id;

    public double responseTime = 0.1;

    @OneToMany(mappedBy = "statistics", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("statistics")
    @OrderBy("id DESC")
    private List<LatestCommandExecuted> latestCommandsExecuted = new ArrayList<>();

    public Statistics() {
    }

    public Statistics(Long id, List<LatestCommandExecuted> list) {
        this.id = id;
        this.latestCommandsExecuted = list;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getResponseTime() { return responseTime; }
    public void setResponseTime(double responseTime) { this.responseTime = responseTime; }

    public List<LatestCommandExecuted> getLatestCommandsExecuted() { return latestCommandsExecuted; }
    public void setLatestCommandsExecuted(List<LatestCommandExecuted> latestCommandsExecuted) {
        this.latestCommandsExecuted = latestCommandsExecuted;
    }
}