package aitimetraveler.service;

import aitimetraveler.dto.ChatMessageDTO;
import aitimetraveler.dto.LlamaRequestDTO;
import aitimetraveler.dto.LlamaResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class AIStoryService {

    private static final Logger logger = LoggerFactory.getLogger(AIStoryService.class);

    @Value("${nvidia.llama.api.url}")
    private String apiUrl;

    @Value("${nvidia.llama.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public AIStoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateStory(String prompt) {
        // Create the chat message with role "user" and your prompt
        ChatMessageDTO userMessage = new ChatMessageDTO();
        userMessage.setRole("user");
        userMessage.setContent(prompt);

        // Build LlamaRequestDTO with message list
        LlamaRequestDTO request = new LlamaRequestDTO();
        request.setModel("nvidia/llama-3.1-nemotron-70b-instruct");
        request.setMessages(Collections.singletonList(userMessage));
        request.setMax_tokens(4000);
        request.setTemperature(0.95);
        request.setTop_p(1.0);
        request.setN(1);
        request.setStream(false);

        // Setup HTTP headers with Bearer token for authorization
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<LlamaRequestDTO> entity = new HttpEntity<>(request, headers);

        try {
            logger.info("Sending prompt to AI API: {}", prompt);

            ResponseEntity<LlamaResponseDTO> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    LlamaResponseDTO.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                LlamaResponseDTO responseBody = response.getBody();
                if (responseBody.getChoices() != null && !responseBody.getChoices().isEmpty()) {
                    String text = responseBody.getChoices().get(0).getMessage().getContent();
                    if (text != null) {
                        String result = text.trim();
                        logger.info("Received AI response successfully.");
                        return result;
                    } else {
                        logger.warn("AI response text is null.");
                        return "AI responded with an empty result.";
                    }
                } else {
                    logger.warn("AI response choices are empty or null.");
                    return "AI response empty or invalid.";
                }
            } else {
                logger.error("AI API returned non-OK status: {}", response.getStatusCode());
                return "AI API error: " + response.getStatusCode();
            }

        } catch (Exception e) {
            logger.error("Exception while calling AI API", e);
            return "Error calling AI API: " + e.getMessage();
        }
    }
}
