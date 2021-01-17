package com.example.springdemo.controller;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.services.AnnouncementService;
import com.example.springdemo.services.FreelancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/freelancer")
public class FreelancerController {

    private final FreelancerService freelancerService;
    private final AnnouncementService announcementService;

    @Autowired
    public FreelancerController(FreelancerService freelancerService, AnnouncementService a) {
        this.freelancerService = freelancerService;
        this.announcementService = a;
    }

    @GetMapping()
    public Set<FreelancerDTO> findAll(){
        return freelancerService.findAll();
    }

    @PostMapping()
    public Integer insert(@RequestBody FreelancerDTO freelancer){
        return freelancerService.insert(freelancer);
    }

    @PutMapping()
    public Freelancer update(@RequestBody FreelancerDTO freelancer) {
        return freelancerService.update(freelancer);
    }

    @DeleteMapping()
    public void delete(@RequestBody FreelancerDTO freelancer){
        freelancerService.delete(freelancer);
    }

    @GetMapping(value = "/{id}")
    public Freelancer findById(@PathVariable("id") Integer id){
        return freelancerService.findFreelancerById(id);
    }

    @PostMapping(value = "/{id}/addAnnouncement")
    public Freelancer addAnnouncement(@PathVariable("id") Integer id, @RequestBody AnnouncementDTO announcement){

        Integer i = announcementService.insert(announcement);
        Announcement a = announcementService.findAnnouncementById(i);
        Freelancer f = freelancerService.addAnnouncement(a, id);
        return f;
    }
}
