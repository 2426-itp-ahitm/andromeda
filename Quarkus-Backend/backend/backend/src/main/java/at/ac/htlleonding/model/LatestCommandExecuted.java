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
    @JoinColumn(name = "command_id")
    @JsonIgnoreProperties("latestCommandsExecuted")
    private Command command;

    @ManyToOne
    @JoinColumn(name = "statistics_id")
    @JsonIgnoreProperties("latestCommandsExecuted")
    private Statistics statistics;

    public LatestCommandExecuted() {
    }

    // Updated constructor to accept both Statistics and Command
    public LatestCommandExecuted(String name, String timestamp, Statistics statistics, Command command) {
        this.name = name;
        this.timestamp = timestamp;
        this.statistics = statistics;
        this.command = command;
    }

    // Legacy constructor for backward compatibility (if needed)
    public LatestCommandExecuted(String name, String timestamp, Statistics statistics) {
        this.name = name;
        this.timestamp = timestamp;
        this.statistics = statistics;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public Statistics getStatistics() {
        return statistics;
    }

    public void setStatistics(Statistics statistics) {
        this.statistics = statistics;
    }
}