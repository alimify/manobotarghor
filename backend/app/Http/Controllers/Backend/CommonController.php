<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommonController extends Controller
{
    public function dashboard()
    {
        return response()->view('backend.dashboard');
    }
}
