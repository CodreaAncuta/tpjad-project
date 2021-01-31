package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.UserDTO;
import com.example.springdemo.entities.User;

public class UserBuilder {

    public static User userDtoToUserInfo(UserDTO userDTO) {

        return new User(userDTO.getEmail(),
                userDTO.getPassword(),
                userDTO.getRole());
    }

    public static UserDTO userInfoToUserDto(User user) {

        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getCreatedTime(),
                user.getUpdatedTime());
    }
}
