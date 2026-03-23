package com.actorgram.api1.dto;

import com.actorgram.api1.domain.Actor;

import java.time.LocalDate;

public class ActorResponse {

    private Long id;
    private String name;
    private Integer birthYear;
    private String nationality;
    private LocalDate debutDate;
    private String gender;
    private String profileImage;

    public static ActorResponse from(Actor a) {
        ActorResponse r = new ActorResponse();
        r.id = a.getId();
        r.name = a.getName();
        r.birthYear = a.getBirthYear();
        r.nationality = a.getNationality();
        r.debutDate = a.getDebutDate();
        r.gender = a.getGender();
        r.profileImage = a.getProfileImage();
        return r;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Integer getBirthYear() { return birthYear; }
    public String getNationality() { return nationality; }
    public LocalDate getDebutDate() { return debutDate; }
    public String getGender() { return gender; }
    public String getProfileImage() { return profileImage; }
}
