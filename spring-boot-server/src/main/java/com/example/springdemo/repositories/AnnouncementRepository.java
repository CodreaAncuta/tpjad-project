package com.example.springdemo.repositories;

import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {
    @Query(value = "SELECT s " +
            "FROM Announcement s " +
            "ORDER BY s.id")
    Set<Announcement> getAllOrdered();

    @Query(value = "SELECT s " +
            "FROM Announcement s WHERE s.freelancer=?1 " +
            "ORDER BY s.id")
    Set<Announcement> getAllPerFreelancer(Freelancer f);

    @Query(value = "SELECT s " +
            "FROM Announcement s WHERE s.service=?1 " +
            "ORDER BY s.id")
    Set<Announcement> getAllPerService(Service f);

    @Query(value = "SELECT s " +
            "FROM Announcement s " +
            "ORDER BY s.standardPrice")
    Set<Announcement> getAllByPrice();

    @Query(value = "SELECT s " +
            "FROM Announcement s " +
            "ORDER BY s.standardDuration")
    Set<Announcement> getAllByDuration();

    @Query(value = "SELECT s " +
            "FROM Announcement s WHERE s.id=?1 ")
    Announcement getById(Integer id);
}
