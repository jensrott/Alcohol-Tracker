<div class="container-fluid">
    <div class="row">
        <div class="bg-light pt-2">
            <ul class="nav nav-pills flex-column">
                @guest
                <li></li>
                @else
                <li class="nav-item">
                    <a href="/tips" class="nav-link">Tips</a>
                </li>
                <li class="nav-item">
                    <a href="/users" class="nav-link">Users</a>
                </li>
                @endguest
            </ul>
        </div>
    </div>
</div>