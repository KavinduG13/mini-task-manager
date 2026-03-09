package com.minitaskmanager.minitaskmanagerbackend.dto.request;

import com.minitaskmanager.minitaskmanagerbackend.enums.TaskPriority;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Status is required")
    private TaskStatus status;

    @NotNull(message = "Priority is required")
    private TaskPriority priority;

    private LocalDate dueDate;
}