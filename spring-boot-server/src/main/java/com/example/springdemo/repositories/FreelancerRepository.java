package com.example.springdemo.repositories;

import com.example.springdemo.entities.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Integer> {
    @Query(value = "SELECT s " +
            "FROM Freelancer s " +
            "ORDER BY s.id")
    Set<Freelancer> getAllOrdered();

    @Query(value = "SELECT s " +
            "FROM Freelancer s WHERE s.name=?1" +
            "ORDER BY s.id")
    Set<Freelancer> getByName(String name);

    @Query(value = "SELECT s " +
            "FROM Freelancer s WHERE s.id=?1 ")
    Freelancer getById(Integer id);
}
