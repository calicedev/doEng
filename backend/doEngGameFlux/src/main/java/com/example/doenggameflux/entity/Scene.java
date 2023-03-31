package com.example.doenggameflux.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("scene")
public class Scene {
    @Id
    private long id;
}
