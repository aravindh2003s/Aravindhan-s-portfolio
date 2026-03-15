package com.portfolio;

import com.portfolio.model.User;
import com.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Remove old admin if it exists
        userRepository.findByUsername("admin").ifPresent(user -> {
            userRepository.delete(java.util.Objects.requireNonNull(user));
            System.out.println("🗑️ Removed old default admin user.");
        });

        // Create a default admin user if the new one doesn't exist
        if (userRepository.findByUsername("aravindh2003s@gmail.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("aravindh2003s@gmail.com");
            admin.setPassword(passwordEncoder.encode("Aravind@#1234"));
            admin.setRole("ROLE_ADMIN");

            userRepository.save(admin);
            System.out.println("✅ Default Admin User created: username='aravindh2003s@gmail.com'");
        }
    }
}
