<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;

use App\Http\Resources\Tip as TipResource;
use App\Tip;

class TipsController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return  TipResource
     */
    public function index()
    {
        // Only send the tips that are accepted
        $tips = Tip::with('user')->where('accepted', "=", 1)->get();
        return TipResource::collection($tips);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'regex:/^([^0-9]*)$/', 'min:3', 'max:50'],
            'description' => ['required', 'string', 'regex:/^([^0-9]*)$/', 'min:11', 'max:255'],
            'user_id' => ['numeric', 'required'],
            'accepted' => ['boolean', 'required']
        ]);

        if ($validator->fails()) {
            $errors = $validator->messages();
            return response()->json(compact('errors'));
        }

        $tip = Tip::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            // TODO: fix this, add the user_id from the logged in user, because is not correct now!!!!!!
            'user_id' => $request->input('user'),
            'accepted' => $request->input('accepted'),
        ]);

        if ($tip->save()) {
            return response()->json(compact('tip'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $tip = Tip::with('user')->findOrFail($id);
        return response()->json(compact('tip'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {

        $tip = Tip::find($id);

        if ($tip) {
            // error_log($request->input('title'));

            $validator = Validator::make($request->all(), [
                'title' => ['string', 'min:3', 'max:50'],
                'description' => ['string', 'min:11', 'max:255'],
                // 'user_id' => ['numeric'],
                // 'accepted' => ['boolean', 'required']
            ]);

            if ($validator->fails()) {
                $errors = $validator->messages();
                return response()->json(compact('errors'));
            }

            $tipData = [
                'title' => $tip->title = $request->input('title'),
                'description' => $tip->description = $request->input('description'),
                // 'user_id' => $tip->user_id = $request->input('user_id'),
                // 'accepted' => $tip->accepted = $request->input('accepted'),
            ];

            if ($tip->update($tipData)) {
                return response()->json(compact('tip'));
            }
        }

        $error = "No tip found with id: ${id}";
        return response()->json(compact('error'), 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $tip = Tip::findOrFail($id);
        if ($tip->delete()) {
            return response()->json(compact('tip'));
        }
    }

    /**
     * Get the tips that a specific user made.
     *
     * @param  int  $id
     * @return Response
     */
    public function getTipsFromUser($id)
    {
        $tips = Tip::with('user')->where('user_id', '=', $id)->get();
        return TipResource::collection($tips);
    }
}
