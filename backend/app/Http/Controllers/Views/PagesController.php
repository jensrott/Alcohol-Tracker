<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class PagesController extends Controller
{
    /**
     * Show the login page.
     *
     * @return View
     */
    public function login()
    {
        return view('auth/login');
    }

    /**
     * Show the register page.
     *
     * @return View
     */
    public function register()
    {
        return view('auth/register');
    }
}
