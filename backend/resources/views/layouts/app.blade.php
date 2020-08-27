<!DOCTYPE html>

<head>
    @include('partials.head')
</head>

<body>
    <div id="app">
        @include('partials.header')
        <div class="row">

            <div class="col-md-2 bg-light pt-2">
                @include('partials.sidenav')
            </div>
            <div class="col-md-10 mt-3">
                <div class="container">
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
    @include('partials.scripts')
</body>