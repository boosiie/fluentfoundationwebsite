package org.fluentfoundation.backend.repository;

import org.fluentfoundation.backend.model.FoundationMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<FoundationMember, Long> {
    Optional<FoundationMember> findByEmail(String email);
    List<FoundationMember> findByRole(String role);
}
