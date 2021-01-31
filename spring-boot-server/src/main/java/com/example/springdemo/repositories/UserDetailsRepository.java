package com.example.springdemo.repositories;

import com.example.springdemo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface UserDetailsRepository extends JpaRepository<User, String> {
    public Optional<User> findByEmail(String userName);

    public Optional<User> findById(Integer id);

    @Override
    public User save(User user);

    public void deleteById(Integer id);
}
