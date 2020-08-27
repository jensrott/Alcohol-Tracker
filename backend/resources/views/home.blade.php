<!DOCTYPE html>

<body>
    @extends('layouts.app')
    @section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">
                        @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                        @endif

                        @guest
                        Welcome guest!
                        <a href="{{route('login')}}">Login</a>
                        @else
                        You are logged in!
                        @endguest
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
</body>