package aitimetraveler.dto;

import java.util.List;

public class LlamaRequestDTO {

    private String model;
    private List<ChatMessageDTO> messages;
    private int max_tokens;
    private double temperature;
    private double top_p;
    private int n;
    private boolean stream;

    // Default constructor
    public LlamaRequestDTO() {}

    // Parameterized constructor
    public LlamaRequestDTO(String model, List<ChatMessageDTO> messages, int max_tokens, double temperature, double top_p, int n, boolean stream) {
        this.model = model;
        this.messages = messages;
        this.max_tokens = max_tokens;
        this.temperature = temperature;
        this.top_p = top_p;
        this.n = n;
        this.stream = stream;
    }

    // Getters and Setters

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<ChatMessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessageDTO> messages) {
        this.messages = messages;
    }

    public int getMax_tokens() {
        return max_tokens;
    }

    public void setMax_tokens(int max_tokens) {
        this.max_tokens = max_tokens;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getTop_p() {
        return top_p;
    }

    public void setTop_p(double top_p) {
        this.top_p = top_p;
    }

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public boolean isStream() {
        return stream;
    }

    public void setStream(boolean stream) {
        this.stream = stream;
    }
}
