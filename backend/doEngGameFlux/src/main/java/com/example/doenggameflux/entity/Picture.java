package com.example.doenggameflux.entity;

import java.time.LocalDateTime;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Builder
@Table("picture")
public class Picture {
    @Id
    private long id;
    @Column("progress_id")
    private long progressId;
    private String image;
    @Column("created_at")
    private LocalDateTime createdAt;

}
