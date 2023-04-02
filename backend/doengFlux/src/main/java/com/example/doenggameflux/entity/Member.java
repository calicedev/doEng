package com.example.doenggameflux.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("member")
public class Member {
    @Id
    private long id;
    private String memberId;
}
