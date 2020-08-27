@if(session()->has('message'))
<div class="alert alert-success alert-dismissible fade show" role="alert">
    {{ session()->get('datatype') }} <strong>{{ session()->get('message') }}</strong> successfully {{ session()->get('crudtype') }}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif