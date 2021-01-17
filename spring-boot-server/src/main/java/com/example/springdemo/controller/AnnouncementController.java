package com.example.springdemo.controller;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/announcement")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping()
    public Set<AnnouncementDTO> findAll(){
        return announcementService.findAll();
    }

    @PostMapping()
    public Integer insert(@RequestBody AnnouncementDTO announcementDTO){
        return announcementService.insert(announcementDTO);
    }

    @PutMapping()
    public Announcement update(@RequestBody AnnouncementDTO announcementDTO) {
        return announcementService.update(announcementDTO);
    }

    @DeleteMapping()
    public void delete(@RequestBody AnnouncementDTO announcementDTO){
        announcementService.delete(announcementDTO);
    }

    @GetMapping(value = "/{id}")
    public Announcement findById(@PathVariable("id") Integer id){
        return announcementService.findAnnouncementById(id);
    }
}
