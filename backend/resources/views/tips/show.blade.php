<!DOCTYPE html>

<body>
    @extends('layouts.app')
    @section('content')
    <meta id="csrf-token" name="csrf-token" content="{{ csrf_token() }}">
    <div class="card">
        <div class="card-header">
            Tips
            <a href="/tips" class="float-right"><i class="fas fa-list-ul"></i></a>
        </div>
        <div class="card-body">
            <p>{{$tip->title}}</p>
            <p>{{$tip->description}}</p>
        </div>
        <div class="card-body">

        </div>
    </div>

    @endsection
</body>