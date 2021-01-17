package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.ServiceDTO;
import com.example.springdemo.entities.Service;

public class ServiceBuilder {

    public ServiceBuilder(){}

    public static ServiceDTO generateDTOFromEntity(Service c){
        return new ServiceDTO(c.getId(), c.getJobPrice(), c.getJobDuration(), c.getFreelancer().getId(), c.getCompany().getId(), c.getAnnouncement().getId());
    }

}
