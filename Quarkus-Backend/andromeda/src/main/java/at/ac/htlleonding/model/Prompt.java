package at.ac.htlleonding.model;

import jakarta.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name=Prompt.QUERY_FIND_ALL, query="select p from Prompt p")
})
public class Prompt {

    public static final String QUERY_FIND_ALL = "Prompt.findAll";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String content;

    public Prompt() {
    }

    public Prompt(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
