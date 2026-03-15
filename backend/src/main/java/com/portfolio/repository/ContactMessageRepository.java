package com.portfolio.repository;

import com.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    // Find all unread messages
    List<ContactMessage> findByIsReadFalse();

    // Find messages by email
    List<ContactMessage> findByEmail(String email);

    // Find messages created after a certain date
    List<ContactMessage> findByCreatedAtAfter(LocalDateTime date);

    // Count unread messages
    long countByIsReadFalse();
}
