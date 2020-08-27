<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param Array role
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        $user = $request->user();
        foreach ($roles as $role) {
            if ($user->hasRole($role)) {
                return $next($request);
            }
        }
        return redirect('/home');
    }
}
