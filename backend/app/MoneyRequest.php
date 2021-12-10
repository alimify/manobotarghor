<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MoneyRequest extends Model
{
    protected $fillable = ['user_id','name','phone','income_source','family_member','amount','seeking_reason','reference1_name','reference1_phone','reference2_name','reference2_phone','location_id','lat','lng','union','description'];


    public function location()
    {
        return $this->belongsTo(Location::class,'location_id','id');
    }


    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function moneyProvider()
    {
        return $this->belongsTo(User::class,'money_provider_id','id');
    }
    

}
