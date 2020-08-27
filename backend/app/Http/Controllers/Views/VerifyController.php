<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;

use App\User;

class VerifyController extends Controller
{
    public function verify($token)
    {
        error_log($token);
        User::where('verify_token', $token)->firstOrFail()
            ->update(['verify_token' => null]);

        // After accepting the email you should be sent to login
        $url = 'http://localhost:4200/login';
        return redirect($url);
    }

    public function verifyByUser($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->update(['verify_token' => null]);
        return redirect('users')->with(['message' => $user->name, 'datatype' => 'User', 'crudtype' => 'verified']);
    }
}
