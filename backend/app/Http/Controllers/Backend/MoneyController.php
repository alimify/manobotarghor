<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\MoneyRequest;
use Illuminate\Http\Request;

class MoneyController extends Controller
{

    public function list()
    {
        $moneyRequests = MoneyRequest::get();

        return response()->view('backend.money.list',compact('moneyRequests'));
    }
}
