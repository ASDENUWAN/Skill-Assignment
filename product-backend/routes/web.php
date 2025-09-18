<?php

use Illuminate\Support\Facades\Route;

// Placeholder to keep Laravel happy
Route::get('/', function () {
    return response()->json(['message' => 'Backend API running']);
});
