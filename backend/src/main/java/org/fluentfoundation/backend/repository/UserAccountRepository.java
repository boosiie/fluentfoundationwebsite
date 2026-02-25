package org.fluentfoundation.backend.repository;

import java.util.List;
import java.util.Optional;
import org.fluentfoundation.backend.model.Role;
import org.fluentfoundation.backend.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByEmail(String email);
    List<UserAccount> findByRole(Role role);
    List<UserAccount> findByActive(boolean active);
}
