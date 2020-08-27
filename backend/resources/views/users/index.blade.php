<!DOCTYPE html>

<body>
    @extends('layouts.app')
    @section('content')
    @component('components.alert')
    @endcomponent
    <div class="card">
        <div class="card-header">
            Users
            <a href="users/create" class="float-right"><i class="fas fa-plus-circle"></i></a>
        </div>
        <div class="card-body">
            List of all Users.
        </div>
    </div>
    <table class="table table-hover mt-3">
        <thead class="thead-light">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th><i class="fas fa-cog"></i></th>
            </tr>
        </thead>

        <tbody>
            @foreach($users as $user)
            @if($user->deleted_at)
            <tr class="table-danger">
                <th scope="row"><a class="text-danger" href="/users/{{$user->id}}">{{$user->id}}</a></th>
                <td>{{$user->name}}</td>
                <td>{{$user->email}}</td>
                <td>{{$user->role}}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <a class="text-danger pr-1" href="/users/{{$user->id}}/edit">
                            <i class="far fa-edit"></i>
                        </a>
                        <form action="/users/{{$user->id}}/restore" method="POST" class="d-inline-block pr-1">
                            @method('PATCH')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-danger" data-toggle="modal" data-target="#restoreModal-{{$user->id}}"><i class="fas fa-plus-circle"></i></button>
                            @component('components.restore-modal')
                            @slot('id')
                            {{$user->id}}
                            @endslot
                            @slot('datatype')
                            user
                            @endslot
                            @slot('title')
                            {{$user->title}}
                            @endslot
                            @endcomponent
                        </form>
                        <form action="/users/{{$user->id}}/delete" method="POST" class="d-inline-block">
                            @method('DELETE')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-danger" data-toggle="modal" data-target="#hardDeleteModal-{{$user->id}}"><i class="fas fa-trash"></i></button>
                            @component('components.harddelete-modal')
                            @slot('id')
                            {{$user->id}}
                            @endslot
                            @slot('datatype')
                            user
                            @endslot
                            @slot('title')
                            {{ $user->name }}
                            @endslot
                            @endcomponent
                        </form>
                    </div>
                </td>
            </tr>
            @else
            <tr>
                <th scope="row"><a href="/users/{{$user->id}}">{{$user->id}}</a></th>
                <td>{{$user->name}}</td>
                <td>{{$user->email}}</td>
                <td>{{$user->role}}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <a class="text-primary pr-1" href="/users/{{$user->id}}/edit">
                            <i class="far fa-edit"></i>
                        </a>
                        <form action="/users/{{$user->id}}" method="POST" class="d-inline-block pr-1">
                            @method('DELETE')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-primary" data-toggle="modal" data-target="#softDeleteModal-{{$user->id}}"><i class="fas fa-minus-circle"></i></button>
                            @component('components.softdelete-modal')
                            @slot('id')
                            {{$user->id}}
                            @endslot
                            @slot('datatype')
                            user
                            @endslot
                            @slot('title')
                            {{$user->title}}
                            @endslot
                            @endcomponent
                        </form>
                        <form action="/users/{{$user->id}}/delete" method="POST" class="d-inline-block">
                            @method('DELETE')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-primary" data-toggle="modal" data-target="#hardDeleteModal-{{$user->id}}"><i class="fas fa-trash"></i></button>
                            @component('components.harddelete-modal')
                            @slot('id')
                            {{$user->id}}
                            @endslot
                            @slot('datatype')
                            user
                            @endslot
                            @slot('title')
                            {{ $user->name }}
                            @endslot
                            @endcomponent
                        </form>
                    </div>
                </td>
            </tr>
            @endif
            @endforeach
        </tbody>

    </table>
    <div class="d-flex justify-content-end">
        {{$users->links()}}
    </div>

    @endsection
</body>