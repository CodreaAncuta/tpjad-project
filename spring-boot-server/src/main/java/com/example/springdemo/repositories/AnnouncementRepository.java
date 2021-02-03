package com.example.springdemo.repositories;

import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

    @Query(value = "SELECT s " +
            "FROM Announcement s WHERE s.freelancer=?1 " +
            "ORDER BY s.id")
    Set<Announcement> getAllPerFreelancer(Freelancer f);

    @Query(value = "SELECT s " +
            "FROM Announcement s WHERE s.service=?1 " +
            "ORDER BY s.id")
    Set<Announcement> getAllPerService(Service f);

    @Query(value = "SELECT s " +
            "FROM Announcement s WHERE s.id=?1 ")
    Announcement getById(Integer id);

    @Query(value = "SELECT * FROM announcement s JOIN freelancer f ON s.freelancer_id=f.id WHERE s.freelancer_id = ?1 ",nativeQuery = true)
    Set<Announcement>  getAllAnnouncementsPerFreelancer(Integer  id);

    public List<Announcement> findByCategoryContains(String category);

    public List<Announcement> findByTechnologyContains(String technology);

    public List<Announcement> findByTechnologyAndCategory(String technology, String category);

    public Set<Announcement> findByPriceLessThanEqual(Integer price);

    public Set<Announcement> findByPriceGreaterThanEqual(Integer price);

    public Set<Announcement> findByPrice(Integer price);

    public Set<Announcement> findByDuration(Integer duration);

    public Announcement findByFreelancerIdAndTitle(Integer fId, String title);
}
