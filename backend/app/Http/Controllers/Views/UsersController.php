<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Validator;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return View
     */
    public function index()
    {
        $users = User::withTrashed()->latest()->paginate(15);
        return view('users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return View
     */
    public function create()
    {
        $roles = User::ROLES;
        $users = User::withTrashed()->pluck('name', 'id')->all();
        return view('users.create', compact('users', 'roles'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return View
     */
    public function edit($id)
    {
        $roles = User::ROLES;
        $user = User::findOrFail($id);

        return view('users.edit', compact('user', 'roles'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return View
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return view('users.show', compact('user'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $user = new User();
        $user->name         = $request->name;
        $user->email        = $request->email;
        $user->password     = Hash::make($request->password);
        $user->role         = $request->role;
        $user->verify_token = Str::random(40);
        $user->save();

        $user->sendVerificationMail($user);

        return redirect('users')->with(['message' => $user->name, 'datatype' => 'User', 'crudtype' => 'created']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserRequest  $request
     * @param  int  $id
     * @return View
     */
    public function update(UserRequest $request, $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        // $tip->title       = request('title');
        // $tip->description = request('description');
        // $tip->user_id     = request('user');
        // $tip->accepted    = request('accepted');
        $rules = [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:email',
            'password' => 'required|string|min:6',
            'role'     => 'required'
        ];

        $data = [
            'name' => $user->name = $request->input('name'),
            'email' => $user->email = $request->input('email'),
            'password' => $user->password = $request->input('password'),
            'role' => $user->role = $request->input('role'),
        ];

        Validator::make($request->all(), $rules);
        $user->update($data, $rules);

        return redirect('users')->with(['message' => $user->title, 'datatype' => 'User', 'crudtype' => 'updated']);
    }

    /**
     * Remove the specified resource from storage.
     * Soft delete.
     * @param  int  $id
     * @return View
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->delete()) {
            return redirect('users')->with(['message' => $user->id, 'datatype' => 'user', 'crudtype' => 'softdeleted']);
        }
    }

    /**
     * Remove the specified resource from storage.
     * Hard delete.
     * @param  int  $id
     * @return View
     */
    public function delete($id)
    {
        $user = user::withTrashed()->findOrFail($id);
        if ($user->forceDelete()) {
            return redirect('users')->with(['message' => $user->id, 'datatype' => 'user', 'crudtype' => 'harddeleted']);
        }
    }

    /**
     * Restore the specified resource from storage.
     * Hard delete.
     * @param  int  $id
     * @return View
     */
    public function restore($id)
    {
        $user = user::withTrashed()->findOrFail($id);
        if ($user->restore()) {
            return redirect('users')->with(['message' => $user->id, 'datatype' => 'user', 'crudtype' => 'restore']);
        }
    }
}
