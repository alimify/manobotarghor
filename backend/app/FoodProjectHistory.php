<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FoodProjectHistory extends Model
{
    public function project()
    {
        return $this->hasOne(FoodProject::class,'id','project_id');
    }
}
