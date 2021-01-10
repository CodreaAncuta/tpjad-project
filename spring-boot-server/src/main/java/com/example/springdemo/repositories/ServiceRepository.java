package com.example.springdemo.repositories;

import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    @Query(value = "SELECT s " +
            "FROM Service s " +
            "ORDER BY s.id")
    Set<Service> getAllOrdered();

    @Query(value = "SELECT s " +
            "FROM Service s " +
            "ORDER BY s.jobPrice")
    Set<Service> getAllByPrice();

    @Query(value = "SELECT s " +
            "FROM Service s " +
            "ORDER BY s.jobDuration")
    Set<Service> getAllByDuration();

    @Query(value = "SELECT s " +
            "FROM Service s WHERE s.freelancer=?1 " +
            "ORDER BY s.id")
    Set<Service> getAllPerFreelancer(Freelancer f);

    @Query(value = "SELECT s " +
            "FROM Service s WHERE s.company=?1 " +
            "ORDER BY s.id")
    Set<Service> getAllPerCompany(Company c);
}
