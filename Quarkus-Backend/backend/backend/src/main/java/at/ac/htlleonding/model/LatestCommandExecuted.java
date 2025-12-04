package at.ac.htlleonding.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class LatestCommandExecuted {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String timestamp;

    @ManyToOne
    @JoinColumn(name = "statistics_id")
    @JsonIgnoreProperties("latestCommandsExecuted")
    private Statistics statistics;

    public LatestCommandExecuted() {
    }

    // --- FIX THIS CONSTRUCTOR ---
    // It must accept 'Statistics', NOT 'Long'
    public LatestCommandExecuted(String name, String timestamp, Statistics statistics) {
        this.name = name;
        this.timestamp = timestamp;
        this.statistics = statistics;
    }
    // ----------------------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public String getTimestamp() { return timestamp; }
    public Statistics getStatistics() { return statistics; }
}