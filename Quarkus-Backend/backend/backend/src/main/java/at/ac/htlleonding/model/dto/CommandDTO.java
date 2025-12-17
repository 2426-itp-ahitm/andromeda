package at.ac.htlleonding.model.dto;

public record CommandDTO(Integer type, String prompt, String code, Long userId) {
}
