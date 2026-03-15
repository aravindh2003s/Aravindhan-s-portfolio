package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    /**
     * Handle contact form submission
     */
    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> handleContact(
            @Valid @RequestBody ContactMessage contactMessage,
            BindingResult bindingResult) {

        Map<String, Object> response = new HashMap<>();

        // Validation errors
        if (bindingResult.hasErrors()) {
            response.put("success", false);
            response.put("message", "Please check your input and try again.");
            response.put("errors", bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Save to database
            ContactMessage savedMessage = contactService.saveMessage(contactMessage);

            // Log to console
            System.out.println("📧 New Contact Form Submission:");
            System.out.println("   Name: " + savedMessage.getName());
            System.out.println("   Email: " + savedMessage.getEmail());
            System.out.println("   Message: " + savedMessage.getMessage());
            System.out.println("   Saved with ID: " + savedMessage.getId());

            // Send email notification (async)
            new Thread(() -> {
                contactService.sendEmailNotification(savedMessage);
                contactService.sendAutoReply(savedMessage);
            }).start();

            response.put("success", true);
            response.put("message", "Thank you for reaching out! I'll get back to you soon.");
            response.put("messageId", savedMessage.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Oops! Something went wrong. Please try again later.");
            System.err.println("Error saving contact message: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Admin endpoint to view all messages
     */
    @GetMapping("/admin/messages")
    public ResponseEntity<Map<String, Object>> getAllMessages() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<ContactMessage> messages = contactService.getAllMessages();
            long unreadCount = contactService.getUnreadCount();

            response.put("success", true);
            response.put("messages", messages);
            response.put("totalCount", messages.size());
            response.put("unreadCount", unreadCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch messages");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Admin endpoint to view unread messages
     */
    @GetMapping("/admin/messages/unread")
    public ResponseEntity<List<ContactMessage>> getUnreadMessages() {
        return ResponseEntity.ok(contactService.getUnreadMessages());
    }

    /**
     * Admin endpoint to mark message as read
     */
    @PutMapping("/admin/messages/{id}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable @org.springframework.lang.NonNull Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            contactService.markAsRead(id);
            response.put("success", true);
            response.put("message", "Message marked as read");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to update message");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
