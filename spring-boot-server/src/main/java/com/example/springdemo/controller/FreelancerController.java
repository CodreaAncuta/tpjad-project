package com.example.springdemo.controller;

import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.services.FreelancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/freelancer")
public class FreelancerController {

    private final FreelancerService freelancerService;

    @Autowired
    public FreelancerController(FreelancerService freelancerService) {
        this.freelancerService = freelancerService;
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
}
