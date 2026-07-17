<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    protected $fillable = [
        'category',
        'description',
        'date',
        'amount'
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
