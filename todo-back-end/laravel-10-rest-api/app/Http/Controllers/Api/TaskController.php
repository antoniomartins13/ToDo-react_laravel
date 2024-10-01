<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\StoreUpdateTaskRequest;

class TaskController extends Controller
{
    public function index(User $user)
    {
        $tasks = $user->tasks; 
        return response()->json($tasks);
    }

    public function store(StoreUpdateTaskRequest $request, User $user)
{
    if (auth()->user()->id !== $user->id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }
    $task = $user->tasks()->create($request->validated());

    return response()->json($task, 201);
}

    public function update(StoreUpdateTaskRequest $request, User $user, Task $task)
    {
        $task->update($request->validated());

        return response()->json($task);
    }

    public function destroy(User $user, Task $task)
    {
        $task->delete();

        return response()->json(null, 204);
    }
}
