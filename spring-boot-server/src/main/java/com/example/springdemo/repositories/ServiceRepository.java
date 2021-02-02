package com.example.springdemo.repositories;

import com.example.springdemo.entities.Announcement;
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

    /*SELECT * FROM patient p JOIN user u ON p.id=u.id WHERE p.doctor_id = ?1*/
    @Query(value = "SELECT * FROM service s JOIN freelancer f ON s.freelancer_id=f.id WHERE s.freelancer_id = ?1 ",nativeQuery = true)
    Set<Service>  getAllPerFreelancer(Integer  id);

    @Query(value = "SELECT s " +
            "FROM Service s WHERE s.company=?1 " +
            "ORDER BY s.id")
    Set<Service> getAllPerCompany(Company c);

    @Query(value = "SELECT s " +
            "FROM Service s WHERE s.id=?1 ")
    Service getById(Integer id);
}
