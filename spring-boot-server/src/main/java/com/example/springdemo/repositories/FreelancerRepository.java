package com.example.springdemo.repositories;

import com.example.springdemo.entities.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Integer> {
}
