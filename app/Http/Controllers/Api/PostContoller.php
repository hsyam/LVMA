<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use Auth;
class PostContoller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function home(){
        return view('vueApp');
    }
    public function index()
    {
        $posts = Post::orderBy('id','desc')->get();
        return $posts ;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request , [
            'title' => 'required' ,
            'body' => 'required' ,
        ]);

        $post = new Post();
        $post->title = $request->title ;
        $post->body = $request->body ;
        $post->user_id = Auth::user()->id ;
        if($post->save()){
            return response(['status' => true, 'msg' => "post added ! "], 200);
        } else {
            return response(['status' => false, 'msg' => "Cant add post ! "], 404);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Post::findOrFail($id) ;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required',
        ]);

        $post->title = $request->title;
        $post->body = $request->body ;
        if($post->save()){
             return response(['status' => true, 'msg' => "post Edited ! "], 200);
        } else {
            return response(['status' => false, 'msg' => "Cant Edit post ! "], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Post::findOrFail($id)->delete()){
             return response(['status' => true, 'msg' => "post Deleted ! "], 200);
        } else {
            return response(['status' => false, 'msg' => "Cant Delete post ! "], 404);
        }

    }
}
