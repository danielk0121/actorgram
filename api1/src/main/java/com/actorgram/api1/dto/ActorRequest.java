package com.actorgram.api1.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class ActorRequest {

    @NotBlank
    private String name;
    @NotNull
    private Integer birthYear;
    @NotBlank
    private String nationality;
    @NotNull
    private LocalDate debutDate;
    private String gender;
    private String profileImage;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getBirthYear() { return birthYear; }
    public void setBirthYear(Integer birthYear) { this.birthYear = birthYear; }
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    public LocalDate getDebutDate() { return debutDate; }
    public void setDebutDate(LocalDate debutDate) { this.debutDate = debutDate; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
}
