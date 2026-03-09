package com.minitaskmanager.minitaskmanagerbackend.dto.response;

import com.minitaskmanager.minitaskmanagerbackend.enums.TaskPriority;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long userId;
    private String userFullName;
}