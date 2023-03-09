package com.ssafy.doeng.data.entity.scene;

import com.ssafy.doeng.data.entity.script.Script;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class Scene {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tale_id", nullable = false)
    private Tale tale;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private Word word;
    @OneToMany(mappedBy = "scene", fetch = FetchType.LAZY)
    private List<Script> scripts;
    @Column
    private String title;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String sceneOrder;
    @Column(nullable = false)
    private String interactiveType;
    @Column(nullable = false)
    private String backgroundMusic;
}
