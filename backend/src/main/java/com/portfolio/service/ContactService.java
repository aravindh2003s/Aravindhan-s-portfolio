package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${portfolio.email.from:aravindh2003s@gmail.com}")
    private String fromEmail;

    @Value("${portfolio.email.to:aravindh2003s@gmail.com}")
    private String toEmail;

    /**
     * Save contact message to database
     */
    @org.springframework.lang.NonNull
    @SuppressWarnings("null")
    public ContactMessage saveMessage(ContactMessage message) {
        return java.util.Objects.requireNonNull(contactMessageRepository.save(message));
    }

    /**
     * Send email notification
     */
    public void sendEmailNotification(ContactMessage message) {
        if (mailSender == null) {
            System.out.println("⚠️ Email service not configured. Message saved to database only.");
            return;
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(toEmail);
            mailMessage.setSubject("New Portfolio Contact: " + message.getName());
            mailMessage.setText(
                    "You have received a new message from your portfolio website!\n\n" +
                            "Name: " + message.getName() + "\n" +
                            "Email: " + message.getEmail() + "\n" +
                            "Message:\n" + message.getMessage() + "\n\n" +
                            "---\n" +
                            "Sent from Aravindhan's Portfolio");

            mailSender.send(mailMessage);
            System.out.println("✅ Email notification sent successfully!");
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            // Don't throw exception - message is already saved to database
        }
    }

    /**
     * Send auto-reply to user
     */
    public void sendAutoReply(ContactMessage message) {
        if (mailSender == null) {
            return;
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(message.getEmail());
            mailMessage.setSubject("Thank you for contacting me!");
            mailMessage.setText(
                    "Hi " + message.getName() + ",\n\n" +
                            "Thank you for reaching out! I have received your message and will get back to you as soon as possible.\n\n"
                            +
                            "Your message:\n" +
                            "\"" + message.getMessage() + "\"\n\n" +
                            "Best regards,\n" +
                            "Aravindhan S\n" +
                            "Software Engineer\n\n" +
                            "---\n" +
                            "This is an automated response from my portfolio website.");

            mailSender.send(mailMessage);
            System.out.println("✅ Auto-reply sent to: " + message.getEmail());
        } catch (Exception e) {
            System.err.println("❌ Failed to send auto-reply: " + e.getMessage());
        }
    }

    /**
     * Get all messages
     */
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    /**
     * Get unread messages
     */
    public List<ContactMessage> getUnreadMessages() {
        return contactMessageRepository.findByIsReadFalse();
    }

    /**
     * Mark message as read
     */
    public void markAsRead(@NonNull Long id) {
        contactMessageRepository.findById(id).ifPresent(message -> {
            message.setRead(true);
            contactMessageRepository.save(message);
        });
    }

    /**
     * Get message count
     */
    public long getUnreadCount() {
        return contactMessageRepository.countByIsReadFalse();
    }
}
