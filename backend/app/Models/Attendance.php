<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Attendance extends Model
{
    use HasFactory,HasApiTokens;
    protected $fillable = [
        'intern_id',
        'date',
        'in_time',
        'out_time',
    ];


    public function intern(){
        return $this->belongsTo(User::class,"intern_id");
    }
}
