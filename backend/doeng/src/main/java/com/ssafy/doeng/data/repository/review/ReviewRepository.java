package com.ssafy.doeng.data.repository.review;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.review.Review;
import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsById(long reviewId);
    Review findByMember(Member member);
    List<Review> findByTaleOrderByCreatedAtDesc(Tale tale);
    Slice<Review> findByTaleOrderByCreatedAtDesc(Tale tale, Pageable pageable);
    @Query("select r.tale.id, count(r.score), sum(r.score) from Review r "
            + "where r.tale.id =: taleId "
            + "group by r.tale.id")
    Object[] findReviewsGroupByTale(@Param("taleId") long taleId);
}
