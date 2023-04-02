package com.example.doenggameflux.entity;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Builder
@Setter
@ToString
@Table("progress")
public class Progress {
    @Id
    private long id;
    @Column("member_id")
    private long memberId;
    @Column("scene_id")
    private long sceneId;
    @Column("played_at")
    private LocalDateTime  playedAt;
}
