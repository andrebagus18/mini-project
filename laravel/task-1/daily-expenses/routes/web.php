<?php

use App\Http\Controllers\ExpensesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ExpensesController::class, 'index'])->name('expenses.index');
Route::post('/create', [ExpensesController::class, 'store'])->name('expenses.store');
Route::put('/update/{id}', [ExpensesController::class, 'update'])->name('expenses.update');
Route::delete('/delete/{expenses}', [ExpensesController::class, 'destroy'])->name('expenses.destroy');
