package com.example.springdemo.services;

import com.example.springdemo.entities.User;
import com.example.springdemo.errorhandler.DuplicateEntryException;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.UserDetailsRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Arrays;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    private UserDetailsRepository userDetailsRepository;

    public UserService(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public User getUserInfoByEmail(String email) {
        Optional<User> userOptional = userDetailsRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User", "user email", email);
        }
        return userOptional.get();
    }

    public User getUserInfoById(Integer id) {
        Optional<User> userOptional = userDetailsRepository.findById(id);
        if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User", "user id", id);
        }
        return userOptional.get();
    }

    public Integer addUser(User user) {
        Optional<User> userOptional = userDetailsRepository.findByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            throw new DuplicateEntryException("User", "email", user.getEmail());
        }

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole(user.getRole());
        user.setCreatedTime(Instant.now().toEpochMilli());
        user.setUpdatedTime(Instant.now().toEpochMilli());
        return userDetailsRepository.save(user).getId();
    }

    public void deleteUser(String id) {
        User user = getUserInfoByEmail(id);
        userDetailsRepository.deleteById(user.getId());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUserInfoByEmail(username);
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().toString());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Arrays.asList(authority));
    }
}