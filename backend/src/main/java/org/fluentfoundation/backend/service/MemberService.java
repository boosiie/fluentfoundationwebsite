package org.fluentfoundation.backend.service;

import org.fluentfoundation.backend.model.FoundationMember;
import org.fluentfoundation.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * Retrieves all members from the database.
     */
    public List<FoundationMember> getAllMembers() {
        return memberRepository.findAll();
    }

    /**
     * Saves a new member or updates an existing one.
     */
    public FoundationMember saveMember(FoundationMember member) {
        return memberRepository.save(member);
    }

    /**
     * Finds a member by their ID.
     */
    public Optional<FoundationMember> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    /**
     * Finds a member by their email address.
     */
    public Optional<FoundationMember> getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    /**
     * Deletes a member by their ID.
     */
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    /**
     * UTILITY: Bulk creates sample data if the database is empty.
     */
    public void initializeSampleData() {
        if (memberRepository.count() == 0) {
            saveMember(new FoundationMember("John", "Doe", "john.doe@example.com", "Admin"));
            saveMember(new FoundationMember("Jane", "Smith", "jane.smith@example.com", "Editor"));
            System.out.println("Sample data initialized.");
        }
    }

    /**
     * UTILITY: Returns the total count of members.
     */
    public long getMemberCount() {
        return memberRepository.count();
    }
}
