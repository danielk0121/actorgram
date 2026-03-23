package com.actorgram.api1.domain;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "actor")
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private Integer birthYear;

    @Column(nullable = false, length = 50)
    private String nationality;

    @Column(nullable = false)
    private LocalDate debutDate;

    @Column(length = 10)
    private String gender;

    @Column(length = 500)
    private String profileImage;

    protected Actor() {}

    public Actor(String name, Integer birthYear, String nationality, LocalDate debutDate,
                 String gender, String profileImage) {
        this.name = name;
        this.birthYear = birthYear;
        this.nationality = nationality;
        this.debutDate = debutDate;
        this.gender = gender;
        this.profileImage = profileImage;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Integer getBirthYear() { return birthYear; }
    public String getNationality() { return nationality; }
    public LocalDate getDebutDate() { return debutDate; }
    public String getGender() { return gender; }
    public String getProfileImage() { return profileImage; }

    public void update(String name, Integer birthYear, String nationality, LocalDate debutDate,
                       String gender, String profileImage) {
        this.name = name;
        this.birthYear = birthYear;
        this.nationality = nationality;
        this.debutDate = debutDate;
        this.gender = gender;
        this.profileImage = profileImage;
    }
}
