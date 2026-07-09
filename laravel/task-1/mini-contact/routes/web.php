<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ContactController::class, 'index'])->name('contacts.index');
Route::post('/create', [ContactController::class, 'store'])->name('contacts.store');
Route::put('/update/{id}', [ContactController::class, 'update'])->name('contacts.update');
Route::delete('/delete/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
