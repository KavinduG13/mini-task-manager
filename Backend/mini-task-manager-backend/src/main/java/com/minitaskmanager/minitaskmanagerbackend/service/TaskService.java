package com.minitaskmanager.minitaskmanagerbackend.service;

import com.minitaskmanager.minitaskmanagerbackend.dto.request.TaskRequest;
import com.minitaskmanager.minitaskmanagerbackend.dto.response.TaskResponse;
import com.minitaskmanager.minitaskmanagerbackend.entity.Task;
import com.minitaskmanager.minitaskmanagerbackend.entity.User;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskPriority;
import com.minitaskmanager.minitaskmanagerbackend.enums.TaskStatus;
import com.minitaskmanager.minitaskmanagerbackend.exception.ResourceNotFoundException;
import com.minitaskmanager.minitaskmanagerbackend.exception.UnauthorizedException;
import com.minitaskmanager.minitaskmanagerbackend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskResponse createTask(TaskRequest request, User currentUser) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .user(currentUser)
                .build();

        return mapToResponse(taskRepository.save(task));
    }

    public Page<TaskResponse> getTasks(User currentUser, TaskStatus status,
                                       TaskPriority priority, Pageable pageable) {
        boolean isAdmin = currentUser.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            if (status != null && priority != null) {
                return taskRepository.findByStatusAndPriority(status, priority, pageable).map(this::mapToResponse);
            } else if (status != null) {
                return taskRepository.findByStatus(status, pageable).map(this::mapToResponse);
            } else if (priority != null) {
                return taskRepository.findByPriority(priority, pageable).map(this::mapToResponse);
            }
            return taskRepository.findAll(pageable).map(this::mapToResponse);
        }

        if (status != null && priority != null) {
            return taskRepository.findByUserIdAndStatusAndPriority(
                    currentUser.getId(), status, priority, pageable).map(this::mapToResponse);
        } else if (status != null) {
            return taskRepository.findByUserIdAndStatus(
                    currentUser.getId(), status, pageable).map(this::mapToResponse);
        } else if (priority != null) {
            return taskRepository.findByUserIdAndPriority(
                    currentUser.getId(), priority, pageable).map(this::mapToResponse);
        }

        return taskRepository.findByUserId(currentUser.getId(), pageable).map(this::mapToResponse);
    }

    public TaskResponse getTaskById(Long taskId, User currentUser) {
        Task task = findTaskAndCheckAccess(taskId, currentUser);
        return mapToResponse(task);
    }

    public TaskResponse updateTask(Long taskId, TaskRequest request, User currentUser) {
        Task task = findTaskAndCheckAccess(taskId, currentUser);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

        return mapToResponse(taskRepository.save(task));
    }

    public TaskResponse markAsCompleted(Long taskId, User currentUser) {
        Task task = findTaskAndCheckAccess(taskId, currentUser);
        task.setStatus(TaskStatus.DONE);
        return mapToResponse(taskRepository.save(task));
    }

    public void deleteTask(Long taskId, User currentUser) {
        Task task = findTaskAndCheckAccess(taskId, currentUser);
        taskRepository.delete(task);
    }

    private Task findTaskAndCheckAccess(Long taskId, User currentUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        boolean isAdmin = currentUser.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !task.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to access this task");
        }

        return task;
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .userId(task.getUser().getId())
                .userFullName(task.getUser().getFullName())
                .build();
    }
}