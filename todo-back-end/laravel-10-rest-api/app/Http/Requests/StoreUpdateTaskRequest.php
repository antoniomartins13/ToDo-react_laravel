<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'completed_at' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
        ];

        if ($this->method() === 'PATCH' || $this->method() === 'PUT') {
            $rules['user_id'] = 'exists:users,id';
        }

        return $rules;
    }
}
