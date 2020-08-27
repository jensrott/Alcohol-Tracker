<!DOCTYPE html>

<body>
    @extends('layouts.app')
    @section('content')
    <div class="card">
        <div class="card-header">
            Create a user
            <a href="/users" class="float-right"><i class="fas fa-list-ul"></i></a>
        </div>
        <div class="card-body">
            <form action="/users" method="POST">
                @csrf
                <div class="form-row form-group">
                    <div class="col">
                        <label for="name">Name</label>
                        <input type="text" class="form-control {{ $errors->has('name') ? 'is-invalid' : ''}}" id="name" name="name" value="{{old('name')}}">
                        @if($errors->has('name'))
                        <div class="invalid-feedback">
                            {{$errors->first('name')}}
                        </div>
                        @endif
                    </div>
                    <div class="col">
                        <label for="email">Email</label>
                        <input type="text" class="form-control {{ $errors->has('email') ? 'is-invalid' : ''}}" id="email" name="email" value="{{old('email')}}">
                        @if($errors->has('email'))
                        <div class="invalid-feedback">
                            {{$errors->first('email')}}
                        </div>
                        @endif
                    </div>
                </div>
                <div class="form-row form-group">
                    <div class="col">
                        <label for="email">Password</label>
                        <input type="password" class="form-control {{ $errors->has('password') ? 'is-invalid' : ''}}" id="password" name="password" value="{{old('password')}}">
                        @if($errors->has('password'))
                        <div class="invalid-feedback">
                            {{$errors->first('password')}}
                        </div>
                        @endif
                    </div>
                    <div class="col">
                        <label for="role">Role</label>
                        <select class="form-control {{ $errors->has('role') ? 'is-invalid' : ''}}" id="role" name="role">
                            <option value="">Select a role</option>
                            @foreach($roles as $role)
                            <option value="{{ $role }}"> {{ $role }}</option>

                            @endforeach
                        </select>
                        @if($errors->has('role'))
                        <div class="invalid-feedback">
                            {{$errors->first('role')}}
                        </div>
                        @endif
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>

        @endsection
</body>