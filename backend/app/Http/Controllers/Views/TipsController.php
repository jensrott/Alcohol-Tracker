<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;

use Illuminate\View\View;
use App\Http\Requests\TipRequest;
use App\Http\Requests\UpdateTipRequest;

use App\Tip;
use App\User;
use Illuminate\Support\Facades\Validator;

class TipsController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return View
     */
    public function index()
    {
        $tips = Tip::withTrashed()->latest()->paginate(15);
        return view('tips.index', compact('tips'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return View
     */
    public function create()
    {
        $users = User::withTrashed()->pluck('name', 'id')->all();
        return view('tips.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TipRequest  $request
     * @return View
     */
    public function store(TipRequest $request)
    {

        // $validator = Validator::make($request->all(), [
        //     'title' => ['required', 'string', 'min:3', 'max:50'],
        //     'description' => ['required', 'string', 'min:11', 'max:255'],
        //     'user_id' => ['numeric', 'required'],
        // ]);

        $tip = new Tip();
        $tip->title         = $request->title;
        $tip->description   = $request->description;
        $tip->user_id       = $request->user;
        $tip->accepted      = $request->accepted;
        $tip->save();

        // if ($validator->fails()) {
        //     $errors = $validator->messages();
        //     return response()->json(compact('errors'));
        // }

        // $tip = Tip::create([
        //     'title' => $request->input('title'),
        //     'description' => $request->input('description'),
        //     'user_id' => $request->input('user'),
        // ]);
        return redirect('tips')->with(['message' => $tip->title, 'datatype' => 'Tip', 'crudtype' => 'created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return View
     */
    public function show($id)
    {
        $tip = Tip::findOrFail($id);
        return view('tips.show', compact('tip'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return View
     */
    public function edit($id)
    {
        $tip = Tip::withTrashed($id)->findOrFail($id);
        $users = User::withTrashed()->pluck('name', 'id')->all();
        return view('tips.edit', compact('tip', 'users'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TipRequest  $request
     * @param  int  $id
     * @return View
     */
    public function update(TipRequest $request, $id)
    {
        $tip = Tip::withTrashed()->findOrFail($id);
        // $tip->title       = request('title');
        // $tip->description = request('description');
        // $tip->user_id     = request('user');
        // $tip->accepted    = request('accepted');
        $rules = [
            'title' => 'required|string|min:3|max:50',
            'description' => 'required|string|min:11|max:255',
            'user_id' => 'required',
            'accepted' => 'required|integer',
        ];

        $data = [
            'title' => $tip->title = $request->input('title'),
            'description' => $tip->description = $request->input('description'),
            'user_id' => $tip->user_id = $request->input('user'),
            'accepted' => $tip->accepted = $request->input('accepted'),
        ];

        Validator::make($request->all(), $rules);
        $tip->update($data, $rules);

        return redirect('tips')->with(['message' => $tip->title, 'datatype' => 'Tip', 'crudtype' => 'updated']);
    }

    /**
     * Remove the specified resource from storage.
     * Soft delete.
     * @param  int  $id
     * @return View
     */
    public function destroy($id)
    {
        $tip = Tip::findOrFail($id);
        if ($tip->delete()) {
            return redirect('tips')->with(['message' => $tip->id, 'datatype' => 'Tip', 'crudtype' => 'softdeleted']);
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
        $tip = Tip::withTrashed()->findOrFail($id);
        if ($tip->forceDelete()) {
            return redirect('tips')->with(['message' => $tip->id, 'datatype' => 'Tip', 'crudtype' => 'harddeleted']);
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
        $tip = Tip::withTrashed()->findOrFail($id);
        if ($tip->restore()) {
            return redirect('tips')->with(['message' => $tip->id, 'datatype' => 'Tip', 'crudtype' => 'restore']);
        }
    }
}
