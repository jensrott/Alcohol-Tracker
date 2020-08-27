<!DOCTYPE html>

<body>
    @extends('layouts.app')
    @section('content')
    @component('components.alert')
    @endcomponent
    <div class="card">
        <div class="card-header">
            Tips
            <a href="tips/create" class="float-right"><i class="fas fa-plus-circle"></i></a>
        </div>
        <div class="card-body">
            List of all tips.
        </div>
    </div>
    <table class="table table-hover mt-3">
        <thead class="thead-light">
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>User</th>
                <th><i class="fas fa-cog"></i></th>
            </tr>
        </thead>

        <tbody>
            @foreach($tips as $tip)
            @if($tip->deleted_at)
            <tr class="table-danger">
                <th scope="row"><a class="text-danger" href="/tips/{{$tip->id}}">{{$tip->id}}</a></th>
                <td>{{$tip->title}}</td>
                <td>{{$tip->description}}</td>
                <td>{{$tip->accepted === 1 ? "Accepted" : "Refused"}}</td>
                <td>{{$tip->trashed_user->name}}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <a class="text-danger pr-1" href="/tips/{{$tip->id}}/edit">
                            <i class="far fa-edit"></i>
                        </a>
                        <form action="/tips/{{$tip->id}}/restore" method="POST" class="d-inline-block pr-1">
                            @method('PATCH')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-danger" data-toggle="modal" data-target="#restoreModal-{{$tip->id}}"><i class="fas fa-plus-circle"></i></button>
                            @component('components.restore-modal')
                            @slot('id')
                            {{$tip->id}}
                            @endslot
                            @slot('datatype')
                            tip
                            @endslot
                            @slot('title')
                            {{$tip->title}}
                            @endslot
                            @endcomponent
                        </form>
                        <form action="/tips/{{$tip->id}}/delete" method="POST" class="d-inline-block">
                            @method('DELETE')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-danger" data-toggle="modal" data-target="#hardDeleteModal-{{$tip->id}}"><i class="fas fa-trash"></i></button>
                            @component('components.harddelete-modal')
                            @slot('id')
                            {{$tip->id}}
                            @endslot
                            @slot('datatype')
                            tip
                            @endslot
                            @slot('title')
                            {{ $tip->name }}
                            @endslot
                            @endcomponent
                        </form>
                    </div>
                </td>
            </tr>
            @else
            <tr>
                <th scope="row"><a href="/tips/{{$tip->id}}">{{$tip->id}}</a></th>
                <td>{{$tip->title}}</td>
                <td>{{$tip->description}}</td>
                <td>{{$tip->accepted === 1 ? "Accepted" : "Refused"}}</td>
                <td>{{$tip->trashed_user->name}}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <a class="text-primary pr-1" href="/tips/{{$tip->id}}/edit">
                            <i class="far fa-edit"></i>
                        </a>
                        <form action="/tips/{{$tip->id}}" method="POST" class="d-inline-block pr-1">
                            @method('DELETE')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-primary" data-toggle="modal" data-target="#softDeleteModal-{{$tip->id}}"><i class="fas fa-minus-circle"></i></button>
                            @component('components.softdelete-modal')
                            @slot('id')
                            {{$tip->id}}
                            @endslot
                            @slot('datatype')
                            tip
                            @endslot
                            @slot('title')
                            {{$tip->title}}
                            @endslot
                            @endcomponent
                        </form>
                        <form action="/tips/{{$tip->id}}/delete" method="POST" class="d-inline-block">
                            @method('DELETE')
                            @csrf
                            <button type="button" class="text-primary btn btn-link p-0 text-primary" data-toggle="modal" data-target="#hardDeleteModal-{{$tip->id}}"><i class="fas fa-trash"></i></button>
                            @component('components.harddelete-modal')
                            @slot('id')
                            {{$tip->id}}
                            @endslot
                            @slot('datatype')
                            tip
                            @endslot
                            @slot('title')
                            {{ $tip->name }}
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
        {{$tips->links()}}
    </div>

    @endsection
</body>