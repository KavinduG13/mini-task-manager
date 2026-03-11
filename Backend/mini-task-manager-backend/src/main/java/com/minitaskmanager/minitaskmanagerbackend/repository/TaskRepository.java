package com.minitaskmanager.minitaskmanagerbackend.repository;

import com.minitaskmanager.minitaskmanagerbackend.entity.Task;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskPriority;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // User-specific queries
    Page<Task> findByUserId(Long userId, Pageable pageable);
    Page<Task> findByUserIdAndStatus(Long userId, TaskStatus status, Pageable pageable);
    Page<Task> findByUserIdAndPriority(Long userId, TaskPriority priority, Pageable pageable);
    Page<Task> findByUserIdAndStatusAndPriority(Long userId, TaskStatus status, TaskPriority priority, Pageable pageable);

    // Admin queries (all users)
    Page<Task> findByStatus(TaskStatus status, Pageable pageable);
    Page<Task> findByPriority(TaskPriority priority, Pageable pageable);
    Page<Task> findByStatusAndPriority(TaskStatus status, TaskPriority priority, Pageable pageable);
}