package at.ac.htlleonding.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class LatestCommandExecuted {

    @Id
    @GeneratedValue
    private String id;
    private String name;
    private String timestamp;

    @ManyToOne
    @JoinColumn(name = "statistics_id")
    @JsonIgnoreProperties({"latestCommandsExecuted"})
    private Statistics statistics;

    public LatestCommandExecuted() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Statistics getStatistics() {
        return statistics;
    }

    public void setStatistics(Statistics statistics) {
        this.statistics = statistics;
    }
}
