@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">
        Edit a tip
        <a href="/tips" class="float-right"><i class="fas fa-list-ul"></i></a>
    </div>
    <div class="card-body">
        <form action="/tips/{{$tip->id}}" method="POST">
            @csrf
            @method('PUT')
            @method('PUT')
            <div class="form-row form-group">
                <div class="col">
                    <label for="title">title</label>
                    <input type="text" class="form-control {{ $errors->has('title') ? 'is-invalid' : ''}}" id="title" name="title" value="{{ $errors->has('title') ? old('title') : $tip->title }}">
                    @if($errors->has('title'))
                    <div class="invalid-feedback">
                        {{$errors->first('title')}}
                    </div>
                    @endif
                </div>
                <div class="col">
                    <label for="description">Description</label>
                    <input type="text" class="form-control {{ $errors->has('description') ? 'is-invalid' : ''}}" id="description" name="description" value="{{ $errors->has('description') ? old('description') : $tip->description }}">
                    @if($errors->has('description'))
                    <div class="invalid-feedback">
                        {{$errors->first('description')}}
                    </div>
                    @endif
                </div>
            </div>
            <div class="form-row form-group">
                <div class="col">
                    <label for="user">Users</label>
                    <select class="form-control {{ $errors->has('user') ? 'is-invalid' : ''}}" id="user" name="user">
                        <option value="">Select a user</option>
                        @foreach($users as $userid => $username)
                        <option value="{{ $userid }}" @if($tip->user_id == $userid) selected @endif>{{ $username }}</option>
                        @endforeach
                    </select>
                    @if($errors->has('user'))
                    <div class="invalid-feedback">
                        {{$errors->first('user')}}
                    </div>
                    @endif
                </div>
            </div>
            <div class="form-row form-group form-check">
                <div class="col">
                    <label class="form-check-label">
                        <input type="hidden" name="accepted" value="0">
                        <input type="checkbox" class="form-check-input {{ $errors->has('accepted') ? 'is-invalid' : ''}}" name="accepted" value="1" {{ $errors->has('accepted') ? (old('accepted')== '1' ? 'checked' : '') : ($tip->accepted == '1' ? 'checked' : '') }}>
                        Accepted
                    </label>
                    @if($errors->has('accepted'))
                    <div class="invalid-feedback">
                        {{$errors->first('accepted')}}
                    </div>
                    @endif
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</div>

@endsection