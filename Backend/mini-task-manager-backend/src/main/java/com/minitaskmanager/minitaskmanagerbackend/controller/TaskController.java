package com.minitaskmanager.minitaskmanagerbackend.controller;

import com.minitaskmanager.minitaskmanagerbackend.dto.request.TaskRequest;
import com.minitaskmanager.minitaskmanagerbackend.dto.response.ApiResponse;
import com.minitaskmanager.minitaskmanagerbackend.dto.response.TaskResponse;
import com.minitaskmanager.minitaskmanagerbackend.entity.User;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskPriority;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskStatus;
import com.minitaskmanager.minitaskmanagerbackend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(
            @Valid @RequestBody TaskRequest request,
            @AuthenticationPrincipal User currentUser) {
        TaskResponse response = taskService.createTask(request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Task created successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<TaskResponse>>> getTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dueDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @AuthenticationPrincipal User currentUser) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<TaskResponse> tasks = taskService.getTasks(currentUser, status, priority, pageable);
        return ResponseEntity.ok(ApiResponse.success("Tasks retrieved successfully", tasks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponse>> getTaskById(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        TaskResponse response = taskService.getTaskById(id, currentUser);
        return ResponseEntity.ok(ApiResponse.success("Task retrieved successfully", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request,
            @AuthenticationPrincipal User currentUser) {
        TaskResponse response = taskService.updateTask(id, request, currentUser);
        return ResponseEntity.ok(ApiResponse.success("Task updated successfully", response));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<TaskResponse>> markAsCompleted(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        TaskResponse response = taskService.markAsCompleted(id, currentUser);
        return ResponseEntity.ok(ApiResponse.success("Task marked as completed", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTask(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        taskService.deleteTask(id, currentUser);
        return ResponseEntity.ok(ApiResponse.success("Task deleted successfully", null));
    }
}